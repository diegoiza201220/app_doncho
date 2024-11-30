import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import User from '../interfaces/user.interface';

export const AuthGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const authService = inject(AuthService);
    const router = inject(Router);
    console.info(route.url, route.url[0].path);
    authService.isLoggedIn || router.navigate(["login"]);
    return true;
  };