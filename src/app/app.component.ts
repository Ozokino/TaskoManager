import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';

interface navItem {
  title: string;
  route: string;
}
type NavList = navItem[];
@Component({
  selector: 'tasko-root',
  standalone: true,
  imports: [RouterOutlet, TaskCreateComponent, TaskListComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  noListNav: NavList = [];
  title(title: string) {
    throw new Error('Method not implemented.');
  }
}
