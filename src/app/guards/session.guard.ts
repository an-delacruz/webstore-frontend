import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
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
    return this.authService.getInfoUsuario().pipe(
      tap((resp: any) => {
        if (!resp.user) {
          this.router.navigate(['/auth']);
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.getInfoUsuario().pipe(
      tap((resp: any) => {
        if (!resp.user) {
          this.router.navigate(['/auth']);
        }
      })
    );
  }
}
