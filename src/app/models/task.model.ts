export interface Task {
    _id: string;
    title: string;
    description: string;
    type: string;
    createdOn: string;
    status: string;
}
export type TempTask = Omit<Task, '_id'>