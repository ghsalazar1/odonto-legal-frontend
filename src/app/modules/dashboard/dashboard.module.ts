import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { NbBadgeModule, NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts'

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    NbBadgeModule,
    NgxChartsModule
    
  ],
})
export class DashboardModule {}