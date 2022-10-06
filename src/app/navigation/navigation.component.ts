import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {AuthService} from '../auth/services/auth.service'
import {Roles} from '../auth/types/roles'
import {User} from '../auth/types/user.interface'

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  displayNav = true
  displayDashboardRoute = false
  user: User | null = null
  isDropdownOpen = false

  constructor(private authService: AuthService, private router: Router) {}

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
