import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCasesComponent } from './list/list-cases.component';
import { RegisterCasesComponent } from './register/register-cases.component';
import { EditCasesComponent } from './edit/edit-cases.component';

const routes: Routes = [
  {
    path: '',
    component: ListCasesComponent,
  },
  {
    path: 'register',
    component: RegisterCasesComponent,
  },
  {
    path: 'edit/:id',
    component: EditCasesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasesRoutingModule {}