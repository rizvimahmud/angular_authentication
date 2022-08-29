import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../types/user';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css'],
})
export class DashbaordComponent implements OnInit {
  users: User[] | null = null;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getAllUsers()
      .subscribe((res: any) => (this.users = res.users));
  }
}
