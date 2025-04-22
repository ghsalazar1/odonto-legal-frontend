import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCasesComponent } from './list/list-cases.component';
import { RegisterCasesComponent } from './register/register-cases.component';
import { CasesRoutingModule } from './cases-routing.module';
import { NbBadgeModule, NbCardModule, NbIconModule, NbInputModule, NbOptionModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { EditCasesComponent } from './edit/edit-cases.component';
import { CaseDetailsComponent } from './details/case-details.component';

@NgModule({
  declarations: [ListCasesComponent, RegisterCasesComponent, EditCasesComponent, CaseDetailsComponent],
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
