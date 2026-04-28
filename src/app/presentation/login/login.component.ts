import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  username = signal('');
  password = signal('');
  usernameTouched = signal(false);
  passwordTouched = signal(false);

  usernameError = computed(() => (!this.username() ? 'Campo obbligatorio.' : ''));
  passwordError = computed(() => (!this.password() ? 'Campo obbligatorio.' : ''));
  isValid = computed(() => !this.usernameError() && !this.passwordError());

  onSubmit(): void {
    this.usernameTouched.set(true);
    this.passwordTouched.set(true);
    if (this.isValid()) {
      this.loginService.login(this.username(), this.password()).subscribe({
        next: () => this.router.navigate(['/homepage']),
        error: (error) => console.error('Login failed', error)
      });
    }
  }
}
