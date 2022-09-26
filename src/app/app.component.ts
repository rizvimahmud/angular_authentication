import {Component, DoCheck, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {AuthService} from './shared/auth.service'
import {Roles} from './types/roles'
import {User} from './types/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  displayNav = true
  displayDashboardRoute = false
  user: User | null = null
  isDropdownOpen = false

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => (this.user = user))
    this.havePermission()
    this.closeDropdown()
  }

  ngDoCheck(): void {
    const authUrls = ['/register', '/login']
    const currentUrl = this.router.url
    if (authUrls.includes(currentUrl)) {
      this.displayNav = false
    } else {
      this.displayNav = true
    }
  }

  logOutUser() {
    this.authService.logout()
    this.closeDropdown()
  }

  havePermission() {
    const currentRole = this.authService.getUserRole()
    if (currentRole === Roles.Admin || currentRole === Roles.Super) {
      this.displayDashboardRoute = true
    }
  }

  openDropDown() {
    this.isDropdownOpen = true
  }

  closeDropdown() {
    this.isDropdownOpen = false
  }

  toggleDropdown() {
    this.isDropdownOpen ? this.closeDropdown() : this.openDropDown()
  }
}
