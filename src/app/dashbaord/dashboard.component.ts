import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'
import { Subject, takeUntil } from 'rxjs'
import { AuthService } from '../auth/services/auth.service'
import { User } from '../auth/types/user.interface'
import { UserService } from '../shared/user.service'

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashbaordComponent implements OnInit, OnDestroy {
  isLoading: boolean = false
  currentUserRole!: string
  columns!: any[]
  users!: User[]
  totalRecords!: number
  defaultOffset = 0
  defaultLimit = 5
  selectedUserName!: string
  // nameQuery!: string

  // Subscriptions
  unsubscribe$: Subject<void> = new Subject<void>()

  @ViewChild(Table)
  table!: Table

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  setTableColumns() {
    this.columns = [
      { field: 'name', header: 'Name' },
      { field: 'avatar', header: 'Avatar' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Role' },
      { field: 'isActive', header: 'Status' },
    ]
  }

  ngOnInit(): void {
    this.isLoading = true
    this.currentUserRole = this.authService.getUserRole()
    this.setTableColumns()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  loadUserData(event: LazyLoadEvent) {
    this.isLoading = true
    let offset = event?.first || this.defaultOffset
    let limit = event?.rows || this.defaultLimit
    let urlEncodedUsername = encodeURIComponent(this.selectedUserName)
    // let urlEncodedName = encodeURIComponent(this.nameQuery)
    this.selectedUserName
      ? this.getUsers(offset, limit, urlEncodedUsername)
      : this.getUsers(offset, limit)
  }

  reloadUserData() {
    this.loadUserData(this.table.createLazyLoadMetadata())
  }

  getUsers(
    offset = this.defaultOffset,
    limit = this.defaultLimit,
    name?: string
  ) {
    this.userService
      .getUsers(offset, limit, name)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.users = res.users
        this.totalRecords = res.totalRecords
        this.isLoading = false
      })
  }

  deleteUser(userId: string) {
    this.isLoading = true
    this.userService
      .deleteUser(userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.reloadUserData()
          this.isLoading = false
        },
      })
  }

  activateUser(userId: string) {
    this.userService
      .handleUserVerification(userId, 'activate')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.reloadUserData()
        },
      })
  }

  deactivateUser(userId: string) {
    this.userService
      .handleUserVerification(userId, 'deactivate')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.reloadUserData()
        },
      })
  }

  // onNameChange(name: string) {
  //   this.nameQuery = name
  //   this.reloadUserData()
  // }

  selectUser(name: string) {
    this.selectedUserName = name
    this.reloadUserData()
  }
}
