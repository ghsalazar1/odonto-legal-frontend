import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCasesComponent } from './list/list-cases.component';
import { RegisterCasesComponent } from './register/register-cases.component';
import { CasesRoutingModule } from './cases-routing.module';
import { NbBadgeModule, NbCardModule, NbIconModule, NbInputModule, NbOptionModule, NbSelectModule, NbUserModule } from '@nebular/theme';

@NgModule({
  declarations: [ListCasesComponent, RegisterCasesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CasesRoutingModule,
    NbIconModule,
    NbCardModule,
    NbBadgeModule,
    NbUserModule,
    NbSelectModule,
    NbOptionModule,
    NbInputModule
  ],
})
export class CasesModule {}
