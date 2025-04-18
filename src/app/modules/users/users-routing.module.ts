import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list/list-users.component';
import { RegisterUserComponent } from './register/register-user.component';
import { EditUserComponent } from './edit/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsersComponent,
  },
  {
    path: 'register',
    component: RegisterUserComponent,
  },
  {
    path: 'edit/:id',
    component: EditUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}