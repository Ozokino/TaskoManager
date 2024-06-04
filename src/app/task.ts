export interface Task{
    title : string;
    description: string;
    type: string ;
    createdOn : Date;
    status: 'pending'| 'completed';
}
export interface TaskList {
    tasks: Task[];
  }

// export interface TaskList{
//     total: number;
//     doneTasks: number;
//     pendingTasks: number;
// }