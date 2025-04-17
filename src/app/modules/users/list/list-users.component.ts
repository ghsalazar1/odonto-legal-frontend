import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.services';
import { ResponseDTO } from '../../../models/response-dto';
import { UserDTO } from '../../../models/user-model';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users: UserDTO[] = [];

  currentPage = 1;
  limit = 10;
  hasMore = true;
  isLoading = false;
  filterForm: any;

  constructor(private userService: UserService, private router: Router, private formBuilder: UntypedFormBuilder,) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      query: ['']
    });
    this.fetchUsers();
  }

  /**
   * Monta e envia a requisição para buscar os usuários
   */
  fetchUsers(): void {
    this.isLoading = true;
    var fields = this.filterForm.value;
    const params = {
      search: fields.query,
      page: this.currentPage,
      limit: this.limit
    };

    console.log(params)

    this.userService.getUsers(params).subscribe({
      next: (response: ResponseDTO<UserDTO>) => {
        this.users = response.data;
        const totalPages = Math.ceil(response.meta.total / this.limit);
        this.hasMore = this.currentPage < totalPages;
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }


  redirectToAddPage(): void {
    this.router.navigate(['/home/users/register'])
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.fetchUsers();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchUsers();
    }
  }

  nextPage(): void {
    if (this.hasMore) {
      this.currentPage++;
      this.fetchUsers();
    }
  }

  editUser(user: UserDTO): void {
    console.log('Editar usuário:', user);
    // Implementar navegação ou abrir modal de edição
  }

  deleteUser(user: UserDTO): void {
    console.log('Excluir usuário:', user);
    // Implementar confirmação e exclusão
  }
}
