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

import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
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
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
    ],
  },
  // Wild card route for 404 requests
  { path: '**', redirectTo: 'session/not-found' },
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
