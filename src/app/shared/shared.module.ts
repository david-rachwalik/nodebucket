/*
============================================
; Title:        shared.module.ts
; Author:       David Rachwalik
; Date:         2022/08/31
; Description:  Shared app modules & components
;===========================================
*/

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { AboutComponent } from '../pages/about/about.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    HomeComponent,
    AuthLayoutComponent,
    LoginComponent,
    ConfirmDialogComponent,
    AboutComponent,
    NotFoundComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    // Components
    BaseLayoutComponent,
    HomeComponent,
    AuthLayoutComponent,
    LoginComponent,
  ],
})
export class SharedModule {}
