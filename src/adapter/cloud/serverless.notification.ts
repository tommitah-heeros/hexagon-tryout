import {
  LambdaClient,
  InvokeCommand,
  type InvokeCommandInput,
} from "@aws-sdk/client-lambda";
import type { NotificationService } from "@port/notification.service";

const STATIC_CLOUD_PARAMS: InvokeCommandInput = {
  FunctionName: "some-cloud-function",
  InvocationType: "Event", // trigger something in a "notification system"
};

// This might need a separate file that is bundled to a full lambda
// https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/lambda/actions
// async function handler(event) {
//   // ... do lambda logic
// }

// could possibly do IaC style and rollout all the structure using code instead of template.yaml.
// would require heavy use of env checking
export function createNotificationCloudFunction(): NotificationService {
  const client = new LambdaClient();

  return {
    async send(data: Record<string, unknown>) {
      await client.send(
        new InvokeCommand({
          ...STATIC_CLOUD_PARAMS,
          Payload: JSON.stringify(data),
        }),
      );
    },
  };
}
