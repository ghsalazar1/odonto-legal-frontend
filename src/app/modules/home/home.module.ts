import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import {
  NbLayoutModule,
  NbSidebarModule,
  NbCardModule,
} from '@nebular/theme';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
  ],
})
export class HomeModule {}
