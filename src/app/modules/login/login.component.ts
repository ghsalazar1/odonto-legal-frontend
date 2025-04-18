import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Login } from '../../models/login-model';
import { ToastAlert } from '../../helpers/toast-alert';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  toast = new ToastAlert();


  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(event: Event, inputs: Login): void {
    if(this.controls['email'].errors || this.controls['password'].errors){
      this.toast.showWarnig("Verifique e-mail e senha.");
      
    }
    else{
      this.authService.login(inputs.email, inputs.password).subscribe({
        next: () => {
          this.router.navigate(['/home/dashboard']);
        },
        error: (err) => {
          this.toast.showError(err.error.error ?? 'Ocorreu um erro durante a tentativa de login.');
          console.error(err);
        },
      });
    }
  }

  get controls() {
    return this.loginForm.controls;
  }

}
