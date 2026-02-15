import {
  LambdaClient,
  InvokeCommand,
  type InvokeCommandInput,
} from "@aws-sdk/client-lambda";
import type { NotificationService } from "@port/notification.service";
import {
  LOCAL_STACK_CREDS,
  LOCAL_STACK_ENDPOINT,
  LOCAL_STACK_REGION,
  NOTIFICATION_FUNCTION_NAME,
} from "./notification.infra";
import { getLogger } from "@adapter/http/web-server";

const STATIC_CLOUD_PARAMS: InvokeCommandInput = {
  FunctionName: NOTIFICATION_FUNCTION_NAME,
  InvocationType: "Event", // trigger something in a "notification system"
};

// This might need a separate file that is bundled to a full lambda
// https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/lambda/actions
// async function handler(event) {
//   // ... do lambda logic
// }

// could possibly do IaC style and rollout all the structure using code instead of template.yaml.
// in real life would probably require heavy use of env checking
export function createNotificationCloudService(): NotificationService {
  const client = new LambdaClient({
    endpoint: LOCAL_STACK_ENDPOINT,
    region: LOCAL_STACK_REGION,
    credentials: LOCAL_STACK_CREDS,
  });

  return {
    async send(data: Record<string, unknown>) {
      const response = await client.send(
        new InvokeCommand({
          ...STATIC_CLOUD_PARAMS,
          Payload: JSON.stringify(data),
        }),
      );

      const logger = getLogger();
      logger.info(
        `LAMBDA response - \
         \nstatus: ${response.StatusCode}\
         \npayload: ${response.Payload}\
         \nerror: ${response.FunctionError}`,
      );
    },
  };
}
