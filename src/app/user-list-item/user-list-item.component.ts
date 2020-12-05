import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListItemComponent {
  @Input()
  user!: User;
}
