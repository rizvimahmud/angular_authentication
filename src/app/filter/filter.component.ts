import { Component, EventEmitter, Output } from '@angular/core'
import { Observable } from 'rxjs'
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

  constructor(private userService: UserService) {
    this.userResponse$ = this.getUsers()
  }

  onSelectUser($event: any) {
    this.selectUserEvent.emit($event.value)
  }

  getUsers(): Observable<UsersResponse> {
    return this.userService.getUsers()
  }
}
