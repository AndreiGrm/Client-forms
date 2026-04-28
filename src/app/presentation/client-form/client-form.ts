import { AfterViewInit, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { Country } from 'country-state-city';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.html',
  styleUrls: ['./client-form.css'],
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DatePickerModule,
    Select
  ]
})
export default class ClientFormComponent implements AfterViewInit {
  private fb = inject(FormBuilder).nonNullable;
  clientService = inject(ClientService);
  router = inject(Router);

  form = this.fb.group({
    idType: ['', Validators.required],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]+$/)]],
    citizenship: ['', Validators.required],
    birthDate: [null as Date | null, Validators.required],
    nationalId: ['', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
    series: ['', [Validators.required, Validators.minLength(2)]],
    number: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    birthCountry: ['', Validators.required],
    birthCity: ['', Validators.required],
    issuer: ['', Validators.required],
    issueDate: [null as Date | null, Validators.required],
    expiryDate: [null as Date | null, Validators.required]
  });

  fields = [
    { name: 'firstName', label: 'Prenume', placeholder: 'Prenume', type: 'text' },
    { name: 'lastName', label: 'Nume', placeholder: 'Nume', type: 'text' },
    { name: 'email', label: 'Email', placeholder: 'Email', type: 'email' },
    { name: 'phone', label: 'Telefon', placeholder: 'Telefon', type: 'text' },
    { name: 'birthDate', label: 'Data nașterii', placeholder: 'Data nașterii', type: 'date' },
    { name: 'citizenship', label: 'Cetățenie', placeholder: 'Cetățenie', type: 'select' },
    { name: 'idType', label: 'Tip act', placeholder: 'Tip act', type: 'text' },
    { name: 'nationalId', label: 'CNP', placeholder: 'CNP', type: 'text' },
    { name: 'series', label: 'Serie', placeholder: 'Serie', type: 'text' },
    { name: 'number', label: 'Număr', placeholder: 'Număr', type: 'text' },
    { name: 'birthCountry', label: 'Țara nașterii', placeholder: 'Țara nașterii', type: 'select' },
    { name: 'birthCity', label: 'Orașul nașterii', placeholder: 'Orașul nașterii', type: 'text' },
    { name: 'issuer', label: 'Emitent', placeholder: 'Emitent', type: 'text' },
    { name: 'issueDate', label: 'Data emiterii', placeholder: 'Data emiterii', type: 'date' },
    { name: 'expiryDate', label: 'Data expirării', placeholder: 'Data expirării', type: 'date' }
  ];

  constructor() {
    this.form.valueChanges.subscribe(value => {
      localStorage.setItem('client-data', JSON.stringify(value));
    });
  }

  getOptions(fieldName: string): CountryOption[] {
    if (fieldName === 'birthCountry' || fieldName === 'citizenship') {
      return Country.getAllCountries().map(c => ({
        name: c.name,
        code: c.isoCode
      }));
    }
    return [];
  }

  ngAfterViewInit(): void {
    const savedData = localStorage.getItem('client-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const dateFields: Array<'birthDate' | 'issueDate' | 'expiryDate'> = ['birthDate', 'issueDate', 'expiryDate'];
        for (const field of dateFields) {
          if (parsed[field]) {
            parsed[field] = new Date(parsed[field]);
          }
        }
        this.form.patchValue(parsed);
      } catch (err) {
        console.error('Error parsing saved data:', err);
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.clientService.add(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['homepage/residence']);
        },
        error: (error) => {
          console.error('Error saving client:', error);
        }
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.errors) return '';

    const errors = control.errors;
    if (errors['required']) return 'Campo obbligatorio.';
    if (errors['email']) return 'Email non valida.';
    if (errors['minlength']) return `Lunghezza minima: ${errors['minlength'].requiredLength}.`;
    if (errors['maxlength']) return `Lunghezza massima: ${errors['maxlength'].requiredLength}.`;
    if (errors['pattern']) return 'Formato non valido.';
    if (errors['min']) return `Valore minimo: ${errors['min'].min}.`;
    if (errors['max']) return `Valore massimo: ${errors['max'].max}.`;
    return 'Campo non valido.';
  }

  nextPage() {
    this.router.navigate(['homepage/residence']);
  }

  clientsPage() {
    this.router.navigate(['homepage/clients']);
  }
}

interface CountryOption {
  name: string;
  code: string;
}
