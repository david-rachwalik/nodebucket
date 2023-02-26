/*
============================================
; Title:        task.service.ts
; Author:       David Rachwalik
; Date:         2022/09/02
; Description:  Service for employee tasks
;===========================================
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response.interface';
import { Employee } from '../models/employee.interface';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  findAllTasks(empId: number): Observable<BaseResponse<Employee>> {
    return this.http.get<BaseResponse<Employee>>(
      `/api/employees/${empId}/tasks`,
    );
  }

  createTask(empId: number, task: string): Observable<BaseResponse<Employee>> {
    return this.http.post<BaseResponse<Employee>>(
      `/api/employees/${empId}/tasks`,
      {
        text: task,
      },
    );
  }

  updateTask(
    empId: number,
    todo: Item[],
    done: Item[],
  ): Observable<BaseResponse<Employee>> {
    return this.http.put<BaseResponse<Employee>>(
      `/api/employees/${empId}/tasks`,
      {
        todo,
        done,
      },
    );
  }

  deleteTask(
    empId: number,
    taskId: string,
  ): Observable<BaseResponse<Employee>> {
    return this.http.delete<BaseResponse<Employee>>(
      `/api/employees/${empId}/tasks/${taskId}`,
    );
  }
}
