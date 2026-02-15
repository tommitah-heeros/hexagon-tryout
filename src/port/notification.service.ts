import type { Notification } from "@domain/notification/Notification";

// re-export type as part of the contract
export type { Notification } from "@domain/notification/Notification";

// common interface between `domain` and `adapter`
export type NotificationService = {
  send: (data: Notification) => Promise<void>;
};
