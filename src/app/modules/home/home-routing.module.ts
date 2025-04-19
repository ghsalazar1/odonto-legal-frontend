import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ListUsersComponent } from '../users/list/list-users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'cases',
        loadChildren: () =>
          import('../cases/cases.module').then((m) => m.CasesModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
