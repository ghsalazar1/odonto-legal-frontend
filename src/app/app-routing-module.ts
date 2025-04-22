import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: localStorage.getItem('token') ? 'home' : 'login', 
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'new-users',
    loadChildren: () =>
      import('./modules/new-users/new-users.module').then((m) => m.NewUsersModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard],
})
export class AppRoutingModule {}
