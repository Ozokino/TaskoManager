import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'tasko-task-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {
  task?: Task;
  taskForm: FormGroup;
  isEditMode = false;
  private destroy$: Subject<void> = new Subject<void>;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      status: ['pending', Validators.required]
    });
  }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.getTask(taskId);
    }

  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getTask(id: string) {
    this.taskService.getATask(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: Task) => {
        this.task = response;
        if (this.task) {
          this.taskForm.setValue({
            title: this.task.title,
            description: this.task.description,
            type: this.task.type,
            status: this.task.status
          });
        }
      },
      error: (error: Error) => {
        console.error(error);
      }
    })

  }
  editMode() {
    this.isEditMode = !this.isEditMode;
  }
  onSave() {
    if (this.taskForm.valid && this.task) {
      const updatedTask = { ...this.task, ...this.taskForm.value };
      this.taskService.editATask(this.task._id as string, updatedTask).pipe(takeUntil(this.destroy$)).subscribe({
        error: (error: Error) => {
          console.error(error);
        }
      })
      this.isEditMode = false;
      this.router.navigate(['/task-list']);
    }
  }
}
