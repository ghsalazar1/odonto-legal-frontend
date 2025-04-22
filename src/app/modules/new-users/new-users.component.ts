import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.services';
import { Router } from '@angular/router';
import { ToastAlert } from '../../helpers/toast-alert';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrl: './new-users.component.scss'
})
export class NewUsersComponent {
  registerForm!: FormGroup;
  roles: any[] = [];
  toast: ToastAlert = new ToastAlert();
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadRoles();
  }

  buildForm() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        roleId: ['', Validators.required],
      },
      { validators: [this.passwordMatchValidator] }
    );
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  loadRoles() {
    this.userService.getRoles().subscribe({
      next: (res) => {
        this.roles = res.filter(q => q.description != "Administrador");
      },
      error: () => {
        this.toast.showError('Erro ao carregar as funções disponíveis');
      },
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.toast.showWarnig('Preencha corretamente todos os campos.');
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload = this.registerForm.value;

    this.authService.newUsers(payload).subscribe({
      next: () => {
        this.toast.showSuccess('Usuário criado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const msg = err?.error?.message ?? 'Erro ao criar usuário.';
        this.toast.showError(msg);
        this.loading = false;
      },
    });
  }
}
