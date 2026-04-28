import { AfterViewInit, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  router = inject(Router);

  form = this.fb.group({
    country: ['', Validators.required],
    cityOrSector: ['', Validators.required],
    type: ['', Validators.required],
    streetType: ['', Validators.required],
    streetName: ['', [Validators.required, Validators.minLength(2)]],
    number: [null as number | null, [Validators.required, Validators.min(1)]],
    building: ['', Validators.maxLength(10)],
    staircase: ['', Validators.maxLength(5)],
    floor: [null as number | null, [Validators.min(0)]],
    apartment: [null as number | null, [Validators.min(1)]],
  });

  fields = [
    { name: 'country', label: 'Țară', placeholder: 'Țară', type: 'text' },
    { name: 'cityOrSector', label: 'Oraș / Sector', placeholder: 'Oraș / Sector', type: 'text' },
    { name: 'type', label: 'Tip locuință', placeholder: 'Tip locuință', type: 'text' },
    { name: 'streetType', label: 'Tip stradă', placeholder: 'Tip stradă', type: 'text' },
    { name: 'streetName', label: 'Nume stradă', placeholder: 'Nume stradă', type: 'text' },
    { name: 'number', label: 'Număr', placeholder: 'Număr', type: 'number' },
    { name: 'building', label: 'Bloc', placeholder: 'Bloc', type: 'text' },
    { name: 'staircase', label: 'Scară', placeholder: 'Scară', type: 'text' },
    { name: 'floor', label: 'Etaj', placeholder: 'Etaj', type: 'number' },
    { name: 'apartment', label: 'Apartament', placeholder: 'Apartament', type: 'number' }
  ];

  constructor() {
    this.form.valueChanges.subscribe(value => {
      localStorage.setItem('residence-data', JSON.stringify(value));
    });
  }

  ngAfterViewInit(): void {
    const savedData = localStorage.getItem('residence-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        this.form.patchValue(parsed);
      } catch (err) {
        console.error('Error parsing saved data:', err);
      }
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'Campo obbligatorio.';
    if (control.errors['minlength']) return `Lunghezza minima: ${control.errors['minlength'].requiredLength}.`;
    if (control.errors['maxlength']) return `Lunghezza massima: ${control.errors['maxlength'].requiredLength}.`;
    if (control.errors['min']) return `Valore minimo: ${control.errors['min'].min}.`;
    if (control.errors['max']) return `Valore massimo: ${control.errors['max'].max}.`;
    return 'Campo non valido.';
  }

  nextPage() {
    this.router.navigate(['homepage/company']);
  }

  previousPage() {
    this.router.navigate(['homepage/client-form']);
  }
}
