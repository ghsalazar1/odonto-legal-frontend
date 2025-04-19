import { Component } from '@angular/core';
import { NbMenuService, NbSidebarService, NbSidebarState } from '@nebular/theme';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  sidebarState: NbSidebarState = 'expanded';

  userMenu = [
    { title: 'Perfil', icon: 'person-outline' },
    { title: 'Logout', icon: 'log-out-outline' }
  ];

  menuItems = [
    { title: 'Dashboard', icon: 'home-outline', link: '/home/dashboard' },
    { title: 'Gestão de Casos', icon: 'folder-outline', link: '/home/cases' },
    { title: 'Relatórios', icon: 'bar-chart-outline', link: '/home/reports' },
    { title: 'Usuários', icon: 'people-outline', link: '/home/users' },
  ];

  menuSubscription: Subscription;

  constructor(
    private sidebarService: NbSidebarService,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private menuService: NbMenuService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        if (result.matches) {
          this.sidebarState = 'collapsed';
          this.sidebarService.collapse('menu-sidebar'); 
        } else {
          this.sidebarState = 'expanded';
          this.sidebarService.expand('menu-sidebar');
        }
      });

      this.menuSubscription = this.menuService.onItemClick()
      .subscribe(({ item }) => this.onAvatarMenuClick(item));
  }
  

  toggleSidebar(): void {
    this.sidebarState =
      this.sidebarState === 'expanded' ? 'compacted' : 'expanded';
    this.sidebarService.toggle(true, 'menu-sidebar');
  }

  onContactClick(){

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onAvatarMenuClick(event: any): void {
    if(event?.title == 'Logout'){
      this.logout();
    }
  }

  homeRedirect(){
    this.router.navigate(['/home/dashboard']);
  }


}
