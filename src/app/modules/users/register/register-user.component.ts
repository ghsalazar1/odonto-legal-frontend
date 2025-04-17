import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleDTO } from '../../../models/role-model';
import { UserService } from '../../../services/user.services';
import { Router } from '@angular/router';
import { UserRegisterModel } from '../../../models/user-register-model';
import { ToastAlert } from '../../../helpers/toast-alert';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent implements OnInit {
  

  userForm: FormGroup;
  roles: RoleDTO[] = [];
  loading = false;
  toast: ToastAlert;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      roleId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordsMatchValidator });
    this.toast = new ToastAlert();
  }

  passwordsMatchValidator(group: FormGroup): null | { passwordsMismatch: boolean } {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe({
      next: (roles) => this.roles = roles,
      error: (err) => console.error('Erro ao carregar perfis:', err)
    });
  }

  addNewUser(user: UserRegisterModel): void{
    console.log(this.userForm.controls['confirmPassword'])
    if (this.userForm.invalid) return;

    const { name, email, roleId, password } = this.userForm.value;

    this.loading = true;
    this.userService.createUser({
      name, email, roleId, password,
      confirmPassword: ''
    }).subscribe({
      next: () => {
        this.router.navigate(['/home/users']);
      },
      error: (err) => {
        this.loading = false;
        
        if(err.error){
          this.toast.showWarnig(err.error.message);
        }

        if (err.status === 409) {
          this.errorMessage = 'Este e-mail já está em uso.';
        } else {
          this.errorMessage = 'Erro ao cadastrar usuário.';
        }
      }
    });
  }
}