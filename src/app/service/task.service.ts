import { Injectable } from '@angular/core';
import { Task } from '../task';
// import { HttpClient } from '@angular/common/http';
import tasksdata from '../../assets/tasks.json';//mēģināju ielikt no assets foldera, bet nekādīgi nestrādāja//sanāca


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = tasksdata.tasks;
  // tasks: Task[] = [];
  // constructor() { }private http:HttpClient

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  updateTask(updatedTask: Task){
    const index = this.tasks.findIndex(task=> task.createdOn=== updatedTask.createdOn);
    if (index !==-1){
      this.tasks[index]= updatedTask;
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}

