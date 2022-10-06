import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {AuthService} from '../auth/services/auth.service'
import {Roles} from '../auth/types/roles'
import {User} from '../auth/types/user.interface'
import {UserService} from '../shared/user.service'

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  users: User[] = []
  currentUser!: User
  selectedUser!: User

  @Output()
  selectUserEvent = new EventEmitter<string>()

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser()
    this.getUsers()
  }

  onSelectUser($event: any) {
    this.selectUserEvent.emit($event.value)
  }

  getCurrentUser() {
    this.authService.currentUser$.subscribe((user) => (this.currentUser = user))
  }

  getUsers() {
    this.currentUser.role === Roles.Admin
      ? this.getAllUsers()
      : this.getRegularUsers()
  }

  getAllUsers() {
    this.userService
      .getAllUsers()
      .subscribe((res: any) => (this.users = res.users))
  }

  getRegularUsers() {
    this.userService
      .getRegularUsers()
      .subscribe((res: any) => (this.users = res.users))
  }
}
