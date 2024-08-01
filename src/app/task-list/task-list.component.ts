import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../service/task.service';
import { Task } from '../../models/task.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tasko-task-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    // console.log(data);
  }

  ngOnInit() {
    
    this.tasks = this.taskService.getTasks();
  }

  onDeleteTask(index: number) {
    this.taskService.deleteTask(index);
  }

}
