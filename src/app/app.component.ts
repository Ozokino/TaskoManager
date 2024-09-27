import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TaskCreateComponent } from './TASKS/task-create/task-create.component';
import { TaskListComponent } from './TASKS/task-list/task-list.component';
import { NavItem, NavList } from './models/navbar.model';
import { RegistrationComponent } from './USERS/registration/registration.component';
import { LoginComponent } from './USERS/login/login.component';

@Component({
  selector: 'tasko-root',
  standalone: true,
  imports: [RouterOutlet, TaskCreateComponent, TaskListComponent, RouterLink, RouterLinkActive, RegistrationComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  noListNav: NavList = [];
  title(title: string) {
    throw new Error('Method not implemented.');
  }
}
