import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../service/task.service';
import { Task } from '../../models/task.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { error } from 'node:console';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'tasko-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  users: User[] = []

  private destroy$: Subject<void> = new Subject<void>;

  constructor(private taskService: TaskService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getTasks();
    this.fetchUsers();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  fetchUsers() :void{
    this.userService.getAllUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe((users: User[]) => {
      this.users = users;
    });
  }
  getTasks() {
    this.taskService.getAllTasks().pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response: Task[]) => {
        this.tasks = response;
      },
      error: (error: Error) => {
        console.error(error);
      }
    })
  }
  getUserNameById(userId: string): string {
    if (!userId || userId === 'UNASSIGNED') return 'UNASSIGNED';
    const user = this.users.find(u => u._id === userId);
    return user ? `${user.firstName} ${user.lastName} (${user.username})` : 'UNASSIGNED';
  }
  deleteATask(taskId: string): void {
    this.taskService.deleteATask(taskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedTasks: Task[]) => {
          this.tasks = updatedTasks;
        },
        error: (error: Error) => {
          console.error(error);
        }
      });
  }
  viewTaskDetail(taskId: string) {
    this.router.navigate(['/task-details', taskId]);
  }
}
