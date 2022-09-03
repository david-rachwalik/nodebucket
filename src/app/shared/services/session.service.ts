/*
============================================
; Title:        session.service.ts
; Author:       David Rachwalik
; Date:         2022/08/17
; Description:  Service for user sessions
;===========================================
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseResponse } from '../models/base-response.interface';
import { Employee } from '../models/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}

  findEmployeeById(empId: number): Observable<BaseResponse<Employee>> {
    return this.http.get<BaseResponse<Employee>>(`/api/employees/${empId}`);
  }
}
