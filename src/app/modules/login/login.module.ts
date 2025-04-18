import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbLayoutModule,
  NbToastrModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbCardModule,
    LoginRoutingModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbEvaIconsModule
  ],
})
export class LoginModule {}
