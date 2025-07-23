import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import {ProcessInstance} from "../models/processinstance.model";

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  constructor(private http: HttpClient) {}

  createProcess(variables: Record<string, any>): Observable<any> {
    return this.http.post(`${baseUrl}/process`, variables);
  }

  getAll(): Observable<ProcessInstance[]> {
    return this.http.get<ProcessInstance[]>(`${baseUrl}/processes`);
  }

}
