import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Client } from '../../model/client.model';
import { Company } from '../../model/company.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.html',
  styleUrls: ['./client-form.css'],
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DatePickerModule
  ]
})
export default class ClientFormComponent {
  private fb = inject(FormBuilder).nonNullable;
  router = inject(Router)
  form = this.fb.group({
      idType: ['', Validators.required],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]+$/)]],
      citizenship: ['', Validators.required],
      birthDate: ['', Validators.required],
      nationalId: ['', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
      series: ['', [Validators.required, Validators.minLength(2)]],
      number: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      birthCountry: ['', Validators.required],
      birthCity: ['', Validators.required],
      issuer: ['', Validators.required],
      issueDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      companies: [[], Validators.required],
      residence: [null, Validators.required]
    });

  fields = [
    { name: 'idType', label: 'ID Type', placeholder: 'ID Type', type: 'text' },
    { name: 'lastName', label: 'Last Name', placeholder: 'Last Name', type: 'text' },
    { name: 'firstName', label: 'First Name', placeholder: 'First Name', type: 'text' },
    { name: 'email', label: 'Email', placeholder: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone', placeholder: 'Phone', type: 'text' },
    { name: 'citizenship', label: 'Citizenship', placeholder: 'Citizenship', type: 'text' },
    { name: 'birthDate', label: 'Birth Date', placeholder: 'Birth Date', type: 'date' },
    { name: 'nationalId', label: 'National Id', placeholder: 'CNP', type: 'text' },
    { name: 'series', label: 'Series', placeholder: 'Series', type: 'text' },
    { name: 'number', label: 'Number', placeholder: 'Number', type: 'text' },
    { name: 'birthCountry', label: 'Birth Country', placeholder: 'Birth Country', type: 'text' },
    { name: 'birthCity', label: 'Birth City', placeholder: 'Birth City', type: 'text' },
    { name: 'issuer', label: 'Issuer', placeholder: 'Issuer', type: 'text' },
    { name: 'issueDate', label: 'Issue Date', placeholder: 'Issue Date', type: 'date' },
    { name: 'expiryDate', label: 'Expiry Date', placeholder: 'Expiry Date', type: 'date' }
  ];

  



  onSubmit(): void {
    console.log(111);
    
    // if (this.form.valid) {
    //   const clientData: Client = this.form.value;
    //   console.log('Form Submitted:', clientData);
    // }
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'This field is required.';
    if (control.errors['email']) return 'Invalid email address.';
    if (control.errors['minlength']) return `Minimum length is ${control.errors['minlength'].requiredLength}.`;
    if (control.errors['maxlength']) return `Maximum length is ${control.errors['maxlength'].requiredLength}.`;
    if (control.errors['pattern']) return 'Invalid format.';
    if (control.errors['min']) return `Value must be at least ${control.errors['min'].min}.`;
    if (control.errors['max']) return `Value must be at most ${control.errors['max'].max}.`;
    return 'Invalid field.';
  }

  nextPage () {
    this.router.navigate(['../residence']);
  }
}
