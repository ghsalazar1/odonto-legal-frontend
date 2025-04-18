import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.services';
import { ToastAlert } from '../../../helpers/toast-alert';
import { UserDTO } from '../../../models/user-model';
import { ResponseDTO } from '../../../models/response-dto';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {

  userForm!: FormGroup;
  roles: any[] = [];
  loading = false;
  userId!: string;
  toast: ToastAlert;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.toast = new ToastAlert();
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roleId: ['', Validators.required],
      password: [''],
      confirmPassword: [''] 
    }, { validators: this.passwordMatchValidator });

    this.loadUserData();
    this.loadRoles();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password && confirm && password !== confirm ? { passwordsMismatch: true } : null;
  }

  loadUserData() {
    this.userService.getUserById(this.userId).subscribe({
      next: (response: ResponseDTO<UserDTO>) => {
        this.userForm.patchValue({
          name:   response?.data?.name,
          email:  response?.data?.email,
          roleId: response?.data?.roleId
        });
      },
      error: () => {
        this.toast.showError('Erro ao carregar usuário.');
        this.router.navigate(['/home/users']);
      }
    });
  }

  loadRoles() {
    this.userService.getRoles().subscribe({
      next: (roles) => (this.roles = roles)
    });
  }

  saveChanges() {
    if (this.userForm.invalid) return;

    const payload = { ...this.userForm.value };

    if (!payload.password) {
      delete payload.password;
      delete payload.confirmPassword;
    }

    this.loading = true;
    this.userService.updateUser(this.userId, payload).subscribe({
      next: () => {
        this.toast.showSuccess('Usuário atualizado com sucesso!');
        this.router.navigate(['/home/users']);
      },
      error: (err) => {
       err?.error?.hasError ? this.toast.showError(err?.error?.message) :   this.toast.showError('Erro ao atualizar usuário.');
        this.loading = false;
      }
    });
  }
}