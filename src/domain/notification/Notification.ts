export type Notification = {
  id: string;
  message: string;
  channel: string;
  createdAt: Date;
  meta?: MetaData;
};

export type MetaData = Record<string, string>;

export type NotificationCreateParams = Pick<
  Notification,
  "message" | "channel"
>;
export type NotificationGetParams = Pick<Notification, "id">;
export type NotificationGetListParams = null; // todo: how are multiple notes accessed?
