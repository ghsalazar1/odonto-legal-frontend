import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.services';
import { PaginatedResponseDTO } from '../../../models/pagination-response-dto';
import { UserDTO } from '../../../models/user-model';

@Component({
  selector: 'app-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users: UserDTO[] = [];

  filters = {
    query: ''
  };

  currentPage = 1;
  limit = 10;
  hasMore = true;

  isLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.isLoading = true;

    const params = {
      search: this.filters.query,
      page: this.currentPage,
      limit: this.limit
    };

    this.userService.getUsers(params).subscribe({
      next: (response: PaginatedResponseDTO<UserDTO>) => {
        this.users = response.data;
        const totalPages = Math.ceil(response.meta.total / this.limit);
        this.hasMore = this.currentPage < totalPages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.getAllUsers();
  }

  editUser(user: UserDTO) {
    console.log('Editar usuário:', user);
  }

  deleteUser(user: UserDTO) {
    console.log('Excluir usuário:', user);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllUsers();
    }
  }

  nextPage() {
    if (this.hasMore) {
      this.currentPage++;
      this.getAllUsers();
    }
  }
}
