export enum NotificationType {
    SUCCESS,
    WARNING,
    FAIL,
}

export interface INotification {
    id: number,
    title: string,
    text: string,
    type: NotificationType,
}