import { AfterViewInit, Component, inject } from '@angular/core';
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
export default class ClientFormComponent implements AfterViewInit {
  private fb = inject(FormBuilder).nonNullable;
  router = inject(Router)
  form = this.fb.group({
    idType: ['', Validators.required],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]+$/)]],
    citizenship: ['', Validators.required],
    birthDate: [null, Validators.required],
    nationalId: ['', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
    series: ['', [Validators.required, Validators.minLength(2)]],
    number: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    birthCountry: ['', Validators.required],
    birthCity: ['', Validators.required],
    issuer: ['', Validators.required],
    issueDate: [null, Validators.required],
    expiryDate: [null, Validators.required]
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

  constructor() {
    this.form.valueChanges.subscribe(value => {
      localStorage.setItem('client-data', JSON.stringify(value));
      console.log('Form data saved to localStorage:', value);
    })
  }

  ngAfterViewInit(): void {
    const savedData = localStorage.getItem('client-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);

        const dateFields = ['birthDate', 'issueDate', 'expiryDate'];
        for (const field of dateFields) {
          if (parsed[field]) {
            parsed[field] = new Date(parsed[field]);
          }
        }

        this.form.patchValue(parsed);
      } catch (err) {
        console.error('Errore parsing dati salvati:', err);
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.router.navigate(['../residence']);
    }
  }



  getErrorMessage(controlName: string): string {
  const control = this.form.get(controlName);
  if (!control || !control.errors) return '';

  const errorKeys = Object.keys(control.errors);
  if (errorKeys.length === 0) return '';

  switch (errorKeys[0]) {
    case 'required':
      return 'This field is required.';
    case 'email':
      return 'Invalid email address.';
    case 'minlength':
      return `Minimum length is ${control.errors['minlength'].requiredLength}.`;
    case 'maxlength':
      return `Maximum length is ${control.errors['maxlength'].requiredLength}.`;
    case 'pattern':
      return 'Invalid format.';
    case 'min':
      return `Value must be at least ${control.errors['min'].min}.`;
    case 'max':
      return `Value must be at most ${control.errors['max'].max}.`;
    default:
      return 'Invalid field.';
  }
}

  nextPage () {
    this.router.navigate(['../residence']);
  }
}
