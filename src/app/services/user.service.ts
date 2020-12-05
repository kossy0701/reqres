import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // tslint:disable-next-line:variable-name
  private _users$ = new BehaviorSubject<User[]>([]);

  get users$(): Observable<User[]> {
    return this._users$.asObservable();
  }

  constructor(private httpClient: HttpClient) { }

  fetchUsers(): void {
    this.httpClient
      .get<{ data: User[] }>('https://reqres.in/api/users')
      .pipe(map(res => res.data))
      .subscribe(users => {
        this._users$.next(users);
      });
  }
}
