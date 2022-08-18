/*
============================================
; Title:        app-routing.module.ts
; Author:       David Rachwalik
; Date:         2022/08/17
; Description:  Core app routing module
;===========================================
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/auth.guard';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
