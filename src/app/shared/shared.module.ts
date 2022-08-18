/*
============================================
; Title:        shared.module.ts
; Author:       David Rachwalik
; Date:         2022/08/17
; Description:  Shared app modules & components
;===========================================
*/

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { AuthLayoutComponent } from '../shared/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from '../shared/base-layout/base-layout.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    HomeComponent,
    AuthLayoutComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    // Components
    BaseLayoutComponent,
    HomeComponent,
    AuthLayoutComponent,
    LoginComponent,
  ],
})
export class SharedModule {}
