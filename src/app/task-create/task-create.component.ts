import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from '../service/task.service';
import { Task } from '../task';

@Component({
  selector: 'tasko-task-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})
export class TaskCreateComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      status: ['pending', Validators.required]
    });
  }

  ngOnInit(): void {}

  onCreateTask() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        createdOn: new Date()
      };
      this.taskService.addTask(newTask);
      this.taskForm.reset({ status: 'pending' }); 
    }
  }
}
