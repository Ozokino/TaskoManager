import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'task-list',
        loadComponent: () => import('./TASKS/task-list/task-list.component').then((c) => c.TaskListComponent)
    },
    {
        path: 'task-create',
        loadComponent: () => import('./TASKS/task-create/task-create.component').then((c) => c.TaskCreateComponent)
    },
    {
        path: 'task-details/:id',
        loadComponent: () => import('./TASKS/task-details/task-details.component').then((c) => c.TaskDetailsComponent)
    },
    {
        path: 'users',
        loadComponent: () => import('./USERS/user-list/user-list.component').then((c) => c.UserListComponent)
    },
    {
        path: 'user-details/:id',
        loadComponent: () => import('./USERS/user-details/user-details.component').then((c) => c.UserDetailsComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./USERS/login/login.component').then((c) => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./USERS/registration/registration.component').then((c) => c.RegistrationComponent)
    },

];