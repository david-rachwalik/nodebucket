/*
============================================
; Title:        login.component.ts
; Author:       David Rachwalik
; Date:         2022/08/17
; Description:  Login page component
;===========================================
*/

import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'primeng/api';
import { Observable } from 'rxjs';

import { Employee } from 'src/app/shared/models/employee.interface';
import { SessionService } from 'src/app/shared/services/session.service';

// http://primefaces.org/primeng/setup

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessages: Message[] = [];
  employee: Employee;

  loginForm: FormGroup = this.fb.group({
    empId: [
      null,
      // regex only allowing number values
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')]),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private sessionService: SessionService,
  ) {
    this.employee = {} as Employee;
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}

  login() {
    const empId = this.loginForm.controls['empId'].value;
    console.log('empId: ', empId);

    this.sessionService.findEmployeeById(empId).subscribe({
      next: (res) => {
        if (res) {
          // Store successful response to employee
          this.employee = res;

          this.router.navigate(['/']);

          // Save 'session_user' in cookie for a day
          this.cookieService.set(
            'session_user',
            this.employee.empId.toString(),
            1,
          );

          // Save 'session_name' in cookie for a day
          this.cookieService.set(
            'session_name',
            `${this.employee.firstName} ${this.employee.lastName}`,
            1,
          );
        } else {
          this.errorMessages = [
            {
              severity: 'error',
              summary: 'Error',
              detail: 'Please enter a valid empId to continue.',
            },
          ];
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessages = [
          {
            severity: 'error',
            summary: 'Error',
            detail: err.message,
          },
        ];
      },
      // complete: () => {},
    });
  }
}
