import { Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskListComponent } from './task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
    {
        path:'task-list',
        component: TaskListComponent
    },
    {
        path:'task-create',
        component: TaskCreateComponent
    },
    {
        path:'task-details/:id',
        component: TaskDetailsComponent
        // loadComponent: () => import ('./task-details/task-details.component').then((c)=> c.TaskDetailsComponent)
    }
];