import {
  CreateFunctionCommand,
  LambdaClient,
  type CreateFunctionCommandInput,
  Runtime,
  PackageType,
  GetFunctionCommand,
  UpdateFunctionCodeCommand,
} from '@aws-sdk/client-lambda'

export const LOCAL_STACK_ENDPOINT = 'http://localhost:4566'
export const LOCAL_STACK_REGION = 'eu-west-1'
export const LOCAL_STACK_CREDS = {
  accessKeyId: 'test',
  secretAccessKey: 'test',
}

const client = new LambdaClient({
  endpoint: LOCAL_STACK_ENDPOINT,
  region: LOCAL_STACK_REGION,
  credentials: LOCAL_STACK_CREDS,
})

const NOTIFICATION_FUNCTION_ZIP_PATH =
  './src/adapter/cloud/serverless/notification-function.zip'
const LAMBDA_SOURCE_PATH = './src/adapter/cloud/serverless/notification.lambda'

async function createLambdaZip() {
  const proc = Bun.spawn(['zip', '-r', '../notification-function.zip', '.'], {
    cwd: LAMBDA_SOURCE_PATH,
  })
  await proc.exited
}

async function getLambdaZipfile() {
  await createLambdaZip()
  const file = await Bun.file(NOTIFICATION_FUNCTION_ZIP_PATH).arrayBuffer()

  return new Uint8Array(file)
}

export const NOTIFICATION_FUNCTION_NAME = 'notification-function'
const NOTIFICATION_FUNCTION_CONFIG: CreateFunctionCommandInput = {
  FunctionName: NOTIFICATION_FUNCTION_NAME,
  Runtime: Runtime.nodejs24x,
  Role: 'arn:aws:iam::000000000000:role/TestRole',
  Handler: 'index.handler',
  Code: {
    ZipFile: await getLambdaZipfile(),
  },
  PackageType: PackageType.Zip,
  // required for predictable urls with localstack
  Tags: { _custom_id_: 'hexagonal-test' },
}

async function lambdaExists() {
  try {
    return await client.send(
      new GetFunctionCommand({ FunctionName: NOTIFICATION_FUNCTION_NAME }),
    )
  } catch (err) {
    // if function doesn't exist, it throws 404
    return false
  }
}

if (await lambdaExists()) {
  await client.send(
    new UpdateFunctionCodeCommand({
      FunctionName: NOTIFICATION_FUNCTION_NAME,
      ZipFile: await getLambdaZipfile(),
    }),
  )
} else {
  await client.send(new CreateFunctionCommand(NOTIFICATION_FUNCTION_CONFIG))
}
