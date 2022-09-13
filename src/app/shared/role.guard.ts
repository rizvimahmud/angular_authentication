import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import {Observable} from 'rxjs'
import {Roles} from '../types/roles'
import {AuthService} from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn
    if (isLoggedIn) {
      const userRole = this.authService.getUserRole()
      if (userRole === Roles.Admin || userRole === Roles.Super) {
        return true
      }
    }
    this.router.navigateByUrl('/')
    return false
  }
}
