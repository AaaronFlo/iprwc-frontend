import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.authService.userRole$.pipe(
          map(role => {
            if (!role || role.trim() === '') {
              this.router.navigate(['/products']);
              return false;
            }
      
            const isAdminRoute = route.routeConfig?.path === 'admin-portal';
      
            if (isAdminRoute && role !== 'ADMIN') {
              this.router.navigate(['/user-portal']);
              return false;
            }
      
            return true;
          })
        );
      }
}