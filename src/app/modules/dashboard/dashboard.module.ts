import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { NbBadgeModule, NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    NbBadgeModule,
    CommonModule,
    NbCardModule,
    NbIconModule,
    NgApexchartsModule
    
  ],
})
export class DashboardModule {}