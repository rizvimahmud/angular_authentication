import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from '../auth/services/auth.service'
import { Roles } from '../auth/types/roles'
import { User } from '../auth/types/user.interface'
import { UserService } from '../shared/user.service'
import { UsersResponse } from '../shared/userResponse.interface'

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  userResponse$!: Observable<UsersResponse>
  selectedUser!: User

  @Output()
  selectUserEvent = new EventEmitter<string>()

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userResponse$ = this.getUsers()
  }

  onSelectUser($event: any) {
    this.selectUserEvent.emit($event.value)
  }

  getUsers(): Observable<UsersResponse> {
    return this.authService.getUserRole() === Roles.Admin
      ? this.userService.getAllUsers()
      : this.userService.getRegularUsers()
  }
}
