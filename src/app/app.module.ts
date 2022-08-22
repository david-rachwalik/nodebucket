/*
============================================
; Title:        app.module.ts
; Author:       David Rachwalik
; Date:         2022/08/17
; Description:  Core app module
;===========================================
*/

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

// Only import [BrowserModule, BrowserAnimationsModule] once
// All other shared/feature modules will import [CommonModule]
// https://dev.to/sanketmaru/import-once-browser-module-1pie

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    // import HttpClientModule after BrowserModule (https://angular.io/guide/http)
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
