import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { Task } from '../../models/task.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'tasko-task-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})
export class TaskCreateComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();
  taskForm: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService, private userService: UserService, private router: Router) {

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
      }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  fetchUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  onCreateTask() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        createdOn: new Date().toISOString()
      };
      console.log('Task Form Value:', this.taskForm.value);

      this.taskService.createTask(newTask)
        .pipe(takeUntil(this.destroy$))

        .subscribe(() => {
          this.taskForm.reset({ status: 'pending'});
          this.router.navigate(['/task-list']);
        });
    }
  }
}
