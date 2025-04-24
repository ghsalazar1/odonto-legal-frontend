import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbOptionModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { ReportsListComponent } from './list/reports-list.component';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  declarations: [ReportsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    NbIconModule,
    NbCardModule,
    NbBadgeModule,
    NbUserModule,
    NbSelectModule,
    NbOptionModule,
    NbButtonModule,
    NbInputModule
  ],
})
export class ReportsModule {}
