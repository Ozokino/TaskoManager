import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path:'task-list',
        loadComponent: () => import ('./task-list/task-list.component').then((c)=> c.TaskListComponent)
    },
    {
        path:'task-create',
        loadComponent: () => import ('./task-create/task-create.component').then((c)=> c.TaskCreateComponent)
    },
    {
        path:'task-details/:id',
        loadComponent: () => import ('./task-details/task-details.component').then((c)=> c.TaskDetailsComponent)
    }
];