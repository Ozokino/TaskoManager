import { Injectable } from '@angular/core';
import { Task, tempTask } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import tasksdata from '../../assets/tasks.json';//mēģināju ielikt no assets foldera, bet nekādīgi nestrādāja//sanāca


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient){}

  private apiUrl = 'http://localhost:8080/api/tasks';

getAllTasks(): Observable<Task[]>{
  return this.http.get<Task[]>(this.apiUrl);
}
getATask (id:string): Observable<Task>{  
  return this.http.get<Task>(`${this.apiUrl}/${id}`);
}
createTask (task :tempTask): Observable<Task>{  
  return this.http.post<Task>(this.apiUrl, task);
}
deleteATask (id:string):Observable<Task>{  
  return this.http.delete<Task>(`${this.apiUrl}/${id}`);
}
editATask (id:string, task:Task):Observable<Task>{  
  return this.http.patch<Task>(`${this.apiUrl}/${id}`,task);
}
}
 // private tasks: Task[] = tasksdata.tasks;
  // // tasks: Task[] = [];
  // // constructor() { }private http:HttpClient

  // getTasks(): Task[] {
  //   return this.tasks;
  // }

  // addTask(task: Task) {
  //   this.tasks.push(task);
  // }

  // updateTask(updatedTask: Task){
  //   const index = this.tasks.findIndex(task=> task.createdOn=== updatedTask.createdOn);
  //   if (index !==-1){
  //     this.tasks[index]= updatedTask;
  //   }
  // }

  // deleteTask(index: number) {
  //   this.tasks.splice(index, 1);
  // }
