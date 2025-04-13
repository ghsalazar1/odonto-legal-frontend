import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import {
  NbLayoutModule,
  NbSidebarModule,
  NbCardModule,
  NbMenuModule,
  NbActionsModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbIconModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbEvaIconsModule,
    NbActionsModule,
    NbUserModule,
    NbContextMenuModule,
    NbButtonModule,
    NbIconModule,
    NbMenuModule,
    NbCardModule,
    NbTreeGridModule,
  ],
})
export class HomeModule {}
