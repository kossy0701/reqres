import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserDetailPageComponent } from './user-detail-page/user-detail-page.component';

const routes: Routes = [
  {
    path: 'users/:userId',
    component: UserDetailPageComponent
  },
  {
    path: '',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
