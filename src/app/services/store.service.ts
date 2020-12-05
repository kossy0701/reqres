import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, queueScheduler, scheduled } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { State, initialState } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // tslint:disable-next-line:variable-name
  private _state$ = new BehaviorSubject<State>(initialState);

  update(fn: (state: State) => State): void {
    const current = this._state$.value;
    queueScheduler.schedule(() => {
      this._state$.next(fn(current));
    });
  }

  select<T>(selector: (state: State) => T): Observable<T> {
    return this._state$.pipe(
      map(selector),
      distinctUntilChanged()
    );
  }

  constructor() { }
}
