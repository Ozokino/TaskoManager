import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../service/task.service';
import { Task } from '../task';

@Component({
  selector: 'tasko-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    
    this.tasks = this.taskService.getTasks();
  }

  onDeleteTask(index: number) {
    this.taskService.deleteTask(index);
  }
}
