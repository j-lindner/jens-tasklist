import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}/tasks`);
  }

  getManuAssigned(): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}/tasks-assigned-manu`);
  }

  getVar1Val1(): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}/tasks-var1-val1`);
  }

  get(id: any): Observable<Task> {
    return this.http.get<Task>(`${baseUrl}/${id}`);
  }

}
