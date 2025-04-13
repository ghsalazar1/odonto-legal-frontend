import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  filter = '';

  users = [
    { name: 'João Silva', email: 'joao@email.com', role: 'Admin' },
    { name: 'Maria Lima', email: 'maria@email.com', role: 'Usuário' },
    { name: 'Carlos Souza', email: 'carlos@email.com', role: 'Moderador' },
  ];
  

  get filteredUsers() {
    if (!this.filter) return this.users;
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  onAddUser() {
    console.log('Novo usuário');
  }

  onEdit(user: any) {
    console.log('Editar', user);
  }

  onDelete(user: any) {
    console.log('Excluir', user);
  }
}
