// common interface between `domain` and `adapter`
export type NotificationService = {
  send: (data: Record<string, unknown>) => Promise<void>;
};
