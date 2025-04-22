import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUsersComponent } from './new-users.component';

const routes: Routes = [
  {
    path: '',
    component: NewUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewUsersRoutingModule {}