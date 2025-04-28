import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.services';
import { ResponseDTO } from '../../../shared/models/response-dto';
import { UserDTO } from '../../../shared/models/user-model';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastAlert } from '../../../helpers/toast-alert';
import Swal from 'sweetalert2';

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
  filterForm: any;
  toast: ToastAlert = new ToastAlert();

  constructor(private userService: UserService, private router: Router, private formBuilder: UntypedFormBuilder,) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      query: ['']
    });
    this.fetchUsers();
  }

  fetchUsers(): void {
    var fields = this.filterForm.value;
    const params = {
      search: fields.query,
      page: this.currentPage,
      limit: this.limit
    };

    this.userService.getUsers(params).subscribe({
      next: (response: ResponseDTO<UserDTO[]>) => {
        this.users = response.data;
        const totalPages = Math.ceil(response.meta.total / this.limit);
        this.hasMore = this.currentPage < totalPages;
      },
      error: (err) => {
        if(err?.status == 403 && err?.error?.hasError == true){
          this.toast.showError(err?.error?.message ?? 'não foi possível capturar os usuários.');
          this.router.navigate(['home/dashboard'])
        }
      },
      complete: () => {
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
    this.router.navigate(['/home/users/edit', user.id]);
  }

  deleteUser(user: UserDTO): void {
    Swal.fire({
      title: 'Confirmação',
      text: `Confirme a exclusão do usuário ${user.name}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            this.toast.showSuccess(`Usuário ${user.name} excluído com sucesso.`);
            this.fetchUsers();
          },
          error: (err) => {
            var _message = err?.error?.message;
            if(_message){
              this.toast.showError(_message);
            }
          }
        });
      }
    });
  }
}
