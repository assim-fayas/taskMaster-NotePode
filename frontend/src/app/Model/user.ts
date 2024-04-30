export interface User {
    password: string;
    email: string;
}

export class NotificationMessage {
    message!: string;
    type!: NotificationType
}
export enum NotificationType {
    success = 0,
    warning = 1,
    error = 2,
    info = 3

}

export interface LoginResponse {
    token: string,

}

export interface TaskForm {
    title: string,
    description: string,
    dueDate: string,
    status: string,
}

export interface Task {
    title: string,
    description: string,
    due_date: string,
    task_status: string,
    _id: string
}
