import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  private loginService = inject(LoginService);
  private authService  = inject(AuthService);
  private router       = inject(Router);

  username       = signal('');
  password       = signal('');
  usernameTouched = signal(false);
  passwordTouched = signal(false);
  loginError      = signal('');

  usernameError = computed(() => (!this.username() ? 'Campo obbligatorio.' : ''));
  passwordError = computed(() => (!this.password() ? 'Campo obbligatorio.' : ''));
  isValid       = computed(() => !this.usernameError() && !this.passwordError());

  onSubmit(): void {
    this.usernameTouched.set(true);
    this.passwordTouched.set(true);
    this.loginError.set('');
    if (this.isValid()) {
      this.loginService.login(this.username(), this.password()).subscribe({
        next: (response) => {
          const users = response as User[];
          if (!users || users.length === 0) {
            this.loginError.set('Credenziali non valide.');
            return;
          }
          this.authService.setUser(users[0]);
          this.router.navigate(['/homepage']);
        },
        error: () => this.loginError.set('Errore di connessione.')
      });
    }
  }
}
