import { Component } from '@angular/core';
import { NbMenuService, NbSidebarService, NbSidebarState } from '@nebular/theme';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDTO } from '../../shared/models/user-model';
import { TokenService } from '../../services/token.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  sidebarState: NbSidebarState = 'collapsed';

  userMenu = [
    { title: 'Perfil', icon: 'person-outline' },
    { title: 'Logout', icon: 'log-out-outline' }
  ];

  menuItems: any[] = [];
  menuSubscription: Subscription;
  loggedUser: UserDTO;


  constructor(
    private sidebarService: NbSidebarService,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private menuService: NbMenuService,
    private tokenService: TokenService
  ) {

    this.loggedUser = tokenService.GetUser();

    // Monta dinamicamente o menu
    this.menuItems = [
      { title: 'Dashboard', icon: 'home-outline', link: '/home/dashboard' },
      { title: 'Gestão de Casos', icon: 'folder-outline', link: '/home/cases' },
      { title: 'Relatórios', icon: 'bar-chart-outline', link: '/home/reports' },
    ];

    if (this.loggedUser?.role?.description === 'Administrador') {
      this.menuItems.push({ title: 'Usuários', icon: 'people-outline', link: '/home/users' });
    }


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
      .subscribe(({ tag, item }) => {
        if (tag === 'menu-sidebar') {
          // Fecha o menu lateral quando um item for clicado
          this.sidebarService.collapse('menu-sidebar');
        }
    
        this.onAvatarMenuClick(item); // mantém a lógica atual do menu do usuário
      });

      this.homeRedirect();
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
