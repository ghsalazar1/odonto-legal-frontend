import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbTableModule,
} from '@nebular/theme';
import { ListUsersComponent } from './list-users.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersRoutingModule } from '../users-routing.module';

@NgModule({
  declarations: [ListUsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule, 
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbTableModule, 
  ],
})
export class UsersModule {}
