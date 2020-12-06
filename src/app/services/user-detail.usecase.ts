import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models/user';
import { StoreService } from './store.service';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailUsecase {
  get user$(): Observable<User | null> {
    return this.storeService.select(state => state.userDetail.user);
  }

  constructor(private userApiService: UserApiService, private storeService: StoreService) {}

  async fetchUser(userId: string): Promise<void> {
    this.storeService.update(state => ({
      ...state,
      userDetail: {
        ...state.userDetail,
        user: null
      }
    }));

    const user = await this.userApiService.getUserById(userId);

    this.storeService.update(state => ({
      ...state,
      userDetail: {
        ...state.userDetail,
        user
      }
    }));
  }
}
