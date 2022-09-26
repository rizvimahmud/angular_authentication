import {Component, OnInit} from '@angular/core'
import {LazyLoadEvent} from 'primeng/api'
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
  isLoading: boolean = false
  currentUser: User | null = null
  columns!: any[]
  users!: User[]
  totalRecords!: number
  offset = 0
  limit = 5

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  loadUserData(event: LazyLoadEvent) {
    this.isLoading = true
    let offset = event?.first || this.offset
    let limit = event?.rows || this.limit
    this.getUsers(offset, limit)
  }

  ngOnInit(): void {
    this.isLoading = true
    this.getCurrentUser()
  }

  getCurrentUser() {
    this.authService.currentUser$.subscribe((user) => (this.currentUser = user))
    this.setTableColumns()
  }

  getUsers(offset?: number, limit?: number) {
    if (this.currentUser) {
      this.currentUser.role === Roles.Admin
        ? this.getAllUsers(offset, limit)
        : this.getRegularUsers(offset, limit)
    }
  }

  getRegularUsers(offset?: number, limit?: number) {
    this.userService.getRegularUsers(offset, limit).subscribe((res: any) => {
      this.users = res.users
      this.totalRecords = res.totalRecords
      this.isLoading = false
    })
  }

  getAllUsers(offset?: number, limit?: number) {
    this.userService.getAllUsers(offset, limit).subscribe((res: any) => {
      this.users = res.users
      this.totalRecords = res.totalRecords
      this.isLoading = false
    })
  }

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

  setTableColumns() {
    this.columns = [
      {field: 'name', header: 'Name'},
      {field: 'avatar', header: 'Avatar'},
      {field: 'email', header: 'Email'},
      {field: 'role', header: 'Role'},
      {field: 'isActive', header: 'Status'},
    ]
  }
}
