export interface Task {
    _id: string;
    title: string;
    description: string;
    type: string;
    createdOn: string;
    status: string;
}
export type tempTask = Omit<Task, '_id'>