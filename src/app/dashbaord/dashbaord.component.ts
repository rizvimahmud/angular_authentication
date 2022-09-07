import {Component, OnInit} from '@angular/core'
import {UserService} from '../shared/user.service'
import {User} from '../types/user'

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css'],
})
export class DashbaordComponent implements OnInit {
  users: User[] | null = null
  isLoading: Boolean = false
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
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
