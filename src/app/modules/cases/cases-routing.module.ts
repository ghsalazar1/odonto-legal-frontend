import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCasesComponent } from './list/list-cases.component';
import { RegisterCasesComponent } from './register/register-cases.component';

const routes: Routes = [
  {
    path: '',
    component: ListCasesComponent,
  },
  {
    path: 'register',
    component: RegisterCasesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasesRoutingModule {}