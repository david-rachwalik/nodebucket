/*
============================================
; Title:        auth.guard.ts
; Author:       David Rachwalik
; Date:         2022/08/17
; Description:  Authentication guard
;===========================================
*/

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check for user info in cookie
    const sessionUser = this.cookieService.get('session_user');
    if (sessionUser) {
      return true;
    } else {
      // If user has no session, redirect them to login page
      this.router.navigate(['/session/login']);
      return false;
    }
  }
}
