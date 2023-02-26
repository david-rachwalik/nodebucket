/*
============================================
; Title:        app.component.ts
; Author:       David Rachwalik
; Date:         2022/08/17
; Description:  Core app component
;===========================================
*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css'],
  template: `<router-outlet></router-outlet>`,
  styles: [``],
})
export class AppComponent {}
