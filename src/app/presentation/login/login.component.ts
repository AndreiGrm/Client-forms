import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-residence',
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

  constructor() {
    this.form.valueChanges.subscribe(value => {
      console.log(value)
    })
  }

    onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.loginService.login(this.form.value.username, this.form.value.password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/homepage']);
          // Navigate to the residence page or perform any other action
        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle login failure, e.g., show an error message
        }
      })
      // this.router.navigate(['../residence']);
    }
  }


  
}
