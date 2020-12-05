import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from './store.service';
import { User } from '../models/user';
import { UserListFilter } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class UserListUsecase {

  constructor(private httpClient: HttpClient, private storeService: StoreService) { }

  get users$(): Observable<User[]> {
    return this.storeService
      .select(state => state.userList)
      .pipe(
        // tslint:disable-next-line:no-shadowed-variable
        map(({ items, filter }) =>
          items.filter(user =>
            (user.first_name + user.last_name).includes(filter.nameFilter)
          )
        )
      );
  }

  get filter$(): Observable<UserListFilter> {
    return this.storeService.select(state => state.userList.filter);
  }

  async fetchUsers(): Promise<void> {
    const users = await this.httpClient
      .get< { data: User[] }>('https://reqres.in/api/users')
      .pipe(map(res => res.data))
      .toPromise();

    this.storeService.update(state => ({
      ...state,
      userList: {
        ...state.userList,
        items: users
      }
    }));
  }

  setNameFilter(nameFilter: string): void {
    this.storeService.update(state => ({
      ...state,
      userList: {
        ...state.userList,
        filter: {
          nameFilter
        }
      }
    }));
  }
}
