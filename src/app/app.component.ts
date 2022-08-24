import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular Authentication';
  user: User | null = null;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => (this.user = user));
  }

  logOutUser() {
    this.authService.logout();
  }
}
