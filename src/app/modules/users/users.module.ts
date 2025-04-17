import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';

import { ListUsersComponent } from './list/list-users.component';
import { RegisterUserComponent } from './register/register-user.component';

import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule,
  NbOptionModule,
  NbIconModule,
} from '@nebular/theme';

@NgModule({
  declarations: [ListUsersComponent, RegisterUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbOptionModule,
    NbIconModule,
  ],
})
export class UsersModule {}
