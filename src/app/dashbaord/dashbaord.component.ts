import {Component, OnInit, ViewChild} from '@angular/core'
import {LazyLoadEvent} from 'primeng/api'
import {Table} from 'primeng/table'
import {AuthService} from '../auth/services/auth.service'
import {Roles} from '../auth/types/roles'
import {User} from '../auth/types/user.interface'
import {UserService} from '../shared/user.service'

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
  defaultOffset = 0
  defaultLimit = 5
  selectedUserName!: string

  @ViewChild(Table)
  table!: Table

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  setTableColumns() {
    this.columns = [
      {field: 'name', header: 'Name'},
      {field: 'avatar', header: 'Avatar'},
      {field: 'email', header: 'Email'},
      {field: 'role', header: 'Role'},
      {field: 'isActive', header: 'Status'},
    ]
  }

  ngOnInit(): void {
    this.isLoading = true
    this.getCurrentUser()
    this.setTableColumns()
  }

  loadUserData(event: LazyLoadEvent) {
    this.isLoading = true
    let offset = event?.first || this.defaultOffset
    let limit = event?.rows || this.defaultLimit
    let urlEncodedUsername = encodeURIComponent(this.selectedUserName)
    this.selectedUserName
      ? this.getUsers(offset, limit, urlEncodedUsername)
      : this.getUsers(offset, limit)
  }

  reloadUserData() {
    this.loadUserData(this.table.createLazyLoadMetadata())
  }

  getCurrentUser() {
    this.authService.currentUser$.subscribe((user) => (this.currentUser = user))
  }

  getUsers(
    offset = this.defaultOffset,
    limit = this.defaultLimit,
    name?: string
  ) {
    if (this.currentUser) {
      this.currentUser.role === Roles.Admin
        ? this.getAllUsers(offset, limit, name)
        : this.getRegularUsers(offset, limit, name)
    }
  }

  getRegularUsers(offset?: number, limit?: number, name?: string) {
    this.userService
      .getRegularUsers(offset, limit, name)
      .subscribe((res: any) => {
        this.users = res.users
        this.totalRecords = res.totalRecords
        this.isLoading = false
      })
  }

  getAllUsers(offset?: number, limit?: number, name?: string) {
    this.userService.getAllUsers(offset, limit, name).subscribe((res: any) => {
      this.users = res.users
      this.totalRecords = res.totalRecords
      this.isLoading = false
    })
  }

  deleteUser(userId: string) {
    this.isLoading = true
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.reloadUserData()
        this.isLoading = false
      },
    })
  }

  activateUser(userId: string) {
    this.userService.handleUserVerification(userId, 'activate').subscribe({
      next: () => {
        this.reloadUserData()
      },
    })
  }

  deactivateUser(userId: string) {
    this.userService.handleUserVerification(userId, 'deactivate').subscribe({
      next: () => {
        this.reloadUserData()
      },
    })
  }

  selectUser(name: string) {
    this.selectedUserName = name
    this.reloadUserData()
  }
}
