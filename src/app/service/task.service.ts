import { Injectable } from '@angular/core';
import { Task, tempTask } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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