import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { Roles } from './types/roles';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Angular Authentication';
  displayNav = true;
  displayDashboardRoute = false;
  user: User | null = null;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => (this.user = user));
    this.authService.getUserRoles();
    this.havePermission();
  }

  ngDoCheck(): void {
    const authUrs = ['/register', '/login'];
    const currentUrl = this.router.url;
    if (authUrs.includes(currentUrl)) {
      this.displayNav = false;
    } else {
      this.displayNav = true;
    }
  }

  logOutUser() {
    this.authService.logout();
  }

  havePermission() {
    const currentRoles = this.authService.getUserRoles();

    if (currentRoles.includes(Roles.Admin)) {
      this.displayDashboardRoute = true;
    }
  }
}
