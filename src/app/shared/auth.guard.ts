import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUrl = state.url;
    const isLoggedIn = this.authService.isLoggedIn();
    const AUTH_URLS = ['/login', '/register'];

    if (AUTH_URLS.includes(currentUrl) && isLoggedIn) {
      return false;
    }
    if (!AUTH_URLS.includes(currentUrl) && !isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}