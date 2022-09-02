/*
============================================
; Title:        home.component.ts
; Author:       David Rachwalik
; Date:         2022/08/31
; Description:  Home page component
;===========================================
*/

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { DialogData } from '../../shared/models/dialog-data.interface';
import { Employee } from '../../shared/models/employee.interface';
import { Item } from '../../shared/models/item.interface';
import { TaskService } from '../../shared/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  taskForm: FormGroup = this.fb.group({
    task: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(35),
      ]),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private taskService: TaskService,
    private dialog: MatDialog,
  ) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);
    this.employee = {} as Employee;
    this.todo = [];
    this.done = [];

    this.taskService.findAllTasks(this.empId).subscribe({
      next: (res) => {
        this.employee = res;
      },
      error: (e) => {
        // console.log(e.message);
        console.log(e);
      },
      complete: () => {
        console.log(this.employee);
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      },
    });
  }

  ngOnInit(): void {}

  createTask(): void {
    const newTask = this.taskForm.controls['task'].value;

    this.taskService.createTask(this.empId, newTask).subscribe({
      next: (res) => {
        this.employee = res;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log(this.employee);
        this.todo = this.employee.todo;
        this.done = this.employee.done;
        this.taskForm.controls['task'].setErrors({ incorrect: false });
      },
    });
  }

  deleteTask(taskId: string): void {
    const dialogData = {} as DialogData;
    dialogData.header = 'Delete Record Dialog';
    dialogData.body = 'Are you sure you want to delete this record?';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result === 'confirm') {
          this.taskService.deleteTask(this.empId, taskId).subscribe({
            next: (res) => {
              this.employee = res.data;
              // this.employee = res;
            },
            error: (e) => {
              console.log(e);
            },
            complete: () => {
              console.log(this.employee);
              this.todo = this.employee.todo;
              this.done = this.employee.done;
            },
          });
        }
      },
    });
  }

  // drop(event: CdkDragDrop<any[]>): void {
  drop(event: CdkDragDrop<Item[]>): void {
    if (event.previousContainer === event.container) {
      // If dropped into same container (data in container from previous to current index)
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log('Reordered tasks in the same column');
      this.updateTaskList(this.empId, this.todo, this.done);
    } else {
      // If dropped into another container
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log('Moved tasks to a new column');
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  updateTaskList(empId: number, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, todo, done).subscribe({
      next: (res) => {
        console.log('update task');
        console.log('---');
        console.log('res: ', res);
        this.employee = res.data;
        // this.employee = res;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log(this.employee);
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      },
    });
  }

  // Easier target for Form control (https://angular.io/api/forms/AbstractControl#haserror)
  get taskControl() {
    return this.taskForm.controls['task'];
  }

  formControlChange(event: any): void {
    console.log(event);
    console.log('---');
    console.log(this.taskForm.controls['task']);
    // console.log(`errors: ${this.taskForm.controls['task']?.errors}`);
  }
}
