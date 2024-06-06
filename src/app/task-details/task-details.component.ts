import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../task';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'tasko-task-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {
  task!: Task;
  taskForm : FormGroup ;
  isEditMode= false;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router, private fb:FormBuilder){
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      status: ['pending', Validators.required]
    });
  }

  ngOnInit(): void {
    const taskId = +this.route.snapshot.paramMap.get('id')!;
    this.task = this.taskService.getTasks()[taskId];
    if (this.task){
      this.taskForm.setValue({
        title: this.task.title,
        description: this.task.description,
        type: this.task.type,
        status: this.task.status
      });
    }
  }
  editMode(){
    this.isEditMode = !this.isEditMode;
  }
  onSave(){
    if (this.taskForm.valid && this.task){
      const updatedTask = {...this.task,...this.taskForm.value};
      this.taskService.updateTask(updatedTask);
      this.isEditMode = false;
      this.router.navigate(['/task-list']);
    } 

  }
}
