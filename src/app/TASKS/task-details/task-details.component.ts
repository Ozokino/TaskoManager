import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { response } from 'express';
import { error } from 'node:console';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'tasko-task-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  task: Task = {
    title: '', description: '', type: '', createdOn: '', status: 'pending', _id: '', assignedTo: ''};
  taskForm: FormGroup;
  isEditMode = false;
  users: User[] = [];
  private destroy$: Subject<void> = new Subject<void>;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router, private fb: FormBuilder, private userService: UserService) {

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      status: ['pending'],
      assignedTo: ['UNASSIGNED']

    });
  }


  ngOnInit(): void {
    this.fetchUsers();
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap(paramMap => {
          const taskID = paramMap.get('id');
          return this.taskService.getATask(taskID as string)
            .pipe(
              catchError(error => {
                console.error(error);
                this.taskNotFound();
                return of(null);
              })
            );
        })
      )
      .subscribe({
        next: (response: Task | null) => {
          if (response) {
            this.task = response;
            this.taskForm.setValue({
              title: this.task.title,
              description: this.task.description,
              type: this.task.type,
              status: this.task.status,
              assignedTo: this.task.assignedTo || 'UNASSIGNED'
            });
          }
        }
      });
  }
  fetchUsers() {
    this.userService.getAllUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe((users: User[]) => {
      this.users = users;
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  taskNotFound(): void {
    alert('Task not found');
    this.router.navigate(['/task-list']);
  }
  editMode() {
    this.isEditMode = !this.isEditMode;
  }
  getUserNameById(userId: string): string {
    const user = this.users.find(u => u._id === userId);
    return user ? `${user.firstName} ${user.lastName} (${user.username})` : 'UNASSIGNED';
  }
  onSave() {
    if (this.taskForm.valid) {

      const updatedTask = this.taskForm.value;
      this.taskService.editATask(this.task._id as string, updatedTask)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.isEditMode = false;
              this.router.navigate(['/task-list']);
            }
          },
          error: (error) => {
            console.error('Error updating task:', error);
            alert('Failed to update the task');
          }

        });
    }
  }
}
