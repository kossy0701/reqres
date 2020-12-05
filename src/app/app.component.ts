import { Component, OnInit } from '@angular/core';
import { UserListFilter } from './models/state';
import { UserListUsecase } from './services/user-list.usecase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users$ = this.userList.users$;
  userListFilter$ = this.userList.filter$;

  constructor(private userList: UserListUsecase) {}

  ngOnInit(): void {
    this.userList.fetchUsers();
  }

  setUserListFilter(value: UserListFilter): void {
    this.userList.setNameFilter(value.nameFilter);
  }
}
