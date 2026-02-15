import type { Notification, NotificationCreateParams } from "./Notification";
import type { NotificationService } from "@port/notification.service";

export function createNotification(service: NotificationService) {
  return {
    async execute({ channel, message }: NotificationCreateParams) {
      const notification: Notification = {
        id: crypto.randomUUID(),
        channel,
        message,
        createdAt: new Date(),
      };

      const metadata = { zoo: "jar" };

      await service.send({ ...notification, meta: metadata });

      return notification;
    },
  };
}

export type CreateNotification = ReturnType<typeof createNotification>;
