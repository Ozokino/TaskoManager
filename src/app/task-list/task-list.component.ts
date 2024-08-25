import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../service/task.service';
import { Task } from '../models/task.model';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'tasko-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  private destroy$: Subject<void> = new Subject<void>;

  constructor(private taskService: TaskService, private router: Router) {
  }

  ngOnInit() {
    this.getTasks();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTasks() {
    this.taskService.getAllTasks().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: Task[]) => {
        this.tasks = response;
      },
      error: (error: Error) => {
        console.error(error);
      }
    })
  }
  deleteATask(taskId: string): void {
    this.taskService.deleteATask(taskId).pipe(takeUntil(this.destroy$),switchMap(()=>this.taskService.getAllTasks())).subscribe(() => {
      this.getTasks();
    });
  }
  viewTaskDetail(taskId: string) {
    this.router.navigate(['/task-details', taskId]);
  }
}
