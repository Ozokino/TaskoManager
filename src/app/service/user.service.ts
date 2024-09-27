import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, TempUser } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/api';

  register(user: TempUser): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  getAUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  deleteAUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/${id}`);
  }
  editAUser(id: string, user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${id}`, user);
  }
}
