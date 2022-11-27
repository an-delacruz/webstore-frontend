import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  get user() {
    return this.authService.user;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    if (!localStorage.getItem('token')) this.router.navigate(['/auth']);
    return this.authService.getInfoUsuario().pipe(
      tap((resp: any) => {
        if (!resp.user) {
          this.router.navigate(['/auth']);
          return false;
        }
        return this.checkRole(next, url);
      })
    );
  }
  checkRole(route: ActivatedRouteSnapshot, url: any): any {
    const requiredRole = route.data['role'];
    if (requiredRole == 'staff') {
      if (this.user.is_staff == true) {
        return true;
      }
    }
    this.router.navigate(['/']);
    return false;
  }
}
