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

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}

  findEmployeeById(empId: number): Observable<any> {
    return this.http.get(`/api/employees/${empId}`);
  }
}
