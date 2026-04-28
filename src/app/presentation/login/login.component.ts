import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  private fb = inject(FormBuilder).nonNullable;
  loginService = inject(LoginService);
  router = inject(Router)

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit(): void {
    if (this.form.valid) {
      this.loginService.login(this.form.value.username, this.form.value.password).subscribe({
        next: () => {
          this.router.navigate(['/homepage']);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    }
  }


  
}
