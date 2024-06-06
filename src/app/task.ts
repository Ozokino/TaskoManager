export interface Task{
    title : string;
    description: string;
    type: string ;
    createdOn : string;
    status: string;
}
// 'pending'| 'completed';
// export interface TaskList {
//     tasks: Task[];
//   }

// export interface TaskList{
//     total: number;
//     doneTasks: number;
//     pendingTasks: number;
// }