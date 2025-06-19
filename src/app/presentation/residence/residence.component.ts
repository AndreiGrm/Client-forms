import { AfterViewInit, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-residence',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule
  ],
  templateUrl: './residence.component.html',
  styleUrl: './residence.component.css'
})
export default class ResidenceComponent implements AfterViewInit {
  private fb = inject(FormBuilder).nonNullable;
  router = inject(Router)
  form = this.fb.group({
    country: ['', Validators.required],
    cityOrSector: ['', Validators.required],
    type: ['', Validators.required],
    streetType: ['', Validators.required],
    streetName: ['', [Validators.required, Validators.minLength(2)]],
    number: [null, [Validators.required, Validators.min(1)]],
    building: ['', Validators.maxLength(10)],
    staircase: ['', Validators.maxLength(5)],
    floor: [null, [Validators.min(0)]],
    apartment: [null, [Validators.min(1)]],
  })

  constructor() {
    this.form.valueChanges.subscribe(value => {
      localStorage.setItem('residence-data', JSON.stringify(value));
      console.log('Form data saved to localStorage:', value);
    })
  }

  fields = [
    { name: 'country', label: 'Țară', placeholder: 'Țară', type: 'text' },
    { name: 'cityOrSector', label: 'Oraș / Sector', placeholder: 'Oraș / Sector', type: 'text' },
    { name: 'type', label: 'Tip locuință', placeholder: 'Tip locuință', type: 'text' },
    { name: 'streetType', label: 'Tip stradă', placeholder: 'Tip stradă', type: 'text' },
    { name: 'streetName', label: 'Nume stradă', placeholder: 'Nume stradă', type: 'text' },
    { name: 'number', label: 'Număr', placeholder: 'Număr', type: 'text' },
    { name: 'building', label: 'Bloc', placeholder: 'Bloc', type: 'text' },
    { name: 'staircase', label: 'Scară', placeholder: 'Scară', type: 'text' },
    { name: 'floor', label: 'Etaj', placeholder: 'Etaj', type: 'text' },
    { name: 'apartment', label: 'Apartament', placeholder: 'Apartament', type: 'text' }
  ];

  // fields = [
  //   { name: 'country', label: 'Country', placeholder: 'Country', type: 'text' },
  //   { name: 'cityOrSector', label: 'City / Sector', placeholder: 'City / Sector', type: 'text' },
  //   { name: 'type', label: 'Type', placeholder: 'Type', type: 'text' },
  //   { name: 'streetType', label: 'Street Type', placeholder: 'Street Type', type: 'text' },
  //   { name: 'streetName', label: 'Street Name', placeholder: 'Street Name', type: 'text' },
  //   { name: 'number', label: 'Number', placeholder: 'Number', type: 'text' },
  //   { name: 'building', label: 'Building', placeholder: 'Building', type: 'text' },
  //   { name: 'staircase', label: 'Staircase', placeholder: 'Staircase', type: 'text' },
  //   { name: 'floor', label: 'Floor', placeholder: 'Floor', type: 'text' },
  //   { name: 'apartment', label: 'Apartment', placeholder: 'Apartment', type: 'text' }
  // ];

    ngAfterViewInit(): void {
      const savedData = localStorage.getItem('residence-data');
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

  onSubmit(): void {
    if (this.form.valid) {
      this.router.navigate(['../company']);
    }
  }

  
  nextPage () {
    this.router.navigate(['../company']);
  }

  previousPage () {
    this.router.navigate(['client-form']);
  }
}
