import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
  canLoad(): Observable<boolean> | boolean {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
