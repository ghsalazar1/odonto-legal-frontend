import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbTableModule,
} from '@nebular/theme';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersComponent],
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
