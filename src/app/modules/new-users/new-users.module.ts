import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUsersComponent } from './new-users.component';
import { NewUsersRoutingModule } from './new-users-routing.module';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbOptionModule, NbSelectModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';



@NgModule({
  declarations: [NewUsersComponent],
  imports: [
    CommonModule,
    NewUsersRoutingModule,
    NbLayoutModule,
    NbCardModule,
    ReactiveFormsModule,
    NbIconModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbOptionModule,
    
  ]
})
export class NewUsersModule { }
