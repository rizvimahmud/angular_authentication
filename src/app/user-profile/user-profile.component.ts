import {Component, OnInit} from '@angular/core'
import {AuthService} from '../shared/auth.service'
import {User} from '../types/user'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User | null = null
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => (this.user = user))
  }
}
