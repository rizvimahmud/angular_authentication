import {Component, OnInit} from '@angular/core'
import {AuthService} from '../shared/auth.service'
import {UserService} from '../shared/user.service'
import {Roles} from '../types/roles'
import {User} from '../types/user'

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css'],
})
export class DashbaordComponent implements OnInit {
  users: User[] | null = null
  user: User | null = null
  isLoading: Boolean = false
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser()
    this.getUsers()
  }

  getCurrentUser() {
    this.authService.currentUser$.subscribe((user) => (this.user = user))
  }

  getUsers() {
    if (this.user) {
      this.user.role === Roles.Admin
        ? this.getAllUsers()
        : this.getUsersWithoutAdmin()
    }
  }

  getUsersWithoutAdmin() {
    this.userService.getUserWithoutAdmin().subscribe((res: any) => {
      this.users = res.users
    })
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.users = res.users
    })
  }

  updateUser() {}

  deleteUser(userId: string) {
    this.isLoading = true
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.getUsers()
        this.isLoading = false
      },
    })
  }

  activateUser(userId: string) {
    this.userService.activateUser(userId).subscribe({
      next: () => {
        this.getUsers()
      },
    })
  }

  deactivateUser(userId: string) {
    this.userService.deactivateUser(userId).subscribe({
      next: () => {
        this.getUsers()
      },
    })
  }
}
