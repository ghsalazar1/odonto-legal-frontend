import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users = [
    { name: 'João Silva', email: 'joao@email.com', role: 'Perito' },
    { name: 'Maria Santos', email: 'maria@email.com', role: 'Administrador' },
    { name: 'Carlos Pereira', email: 'carlos@email.com', role: 'Assistente' },
  ];

  filters = {
    query: ''
  };

  currentPage = 1;
  hasMore = true;

  filterUsers() {
    console.log('Filtro aplicado:', this.filters);
  }

  editUser(user: any) {
    console.log('Editar usuário:', user);
  }

  deleteUser(user: any) {
    console.log('Excluir usuário:', user);
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    this.currentPage++;
  }
}