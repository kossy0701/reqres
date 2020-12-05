import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users = this.userService.users$;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchUsers();
  }
}
