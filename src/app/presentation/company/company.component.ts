import { AfterViewInit, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export default class CompanyComponent implements AfterViewInit {
  private fb = inject(FormBuilder).nonNullable;
  router = inject(Router);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    cui: ['', [Validators.required, Validators.pattern(/^[0-9]{8,10}$/)]],
    tradeRegisterNumber: ['', [Validators.required, Validators.minLength(3)]],
    mainCaen: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
  });

  fields = [
    { name: 'name', label: 'Denumire firmă', placeholder: 'Denumire firmă', type: 'text' },
    { name: 'cui', label: 'CUI', placeholder: 'CUI', type: 'text' },
    { name: 'tradeRegisterNumber', label: 'Nr. Registrul Comerțului', placeholder: 'Nr. Registrul Comerțului', type: 'text' },
    { name: 'mainCaen', label: 'Cod CAEN', placeholder: 'Cod CAEN', type: 'text' },
    { name: 'address', label: 'Adresă', placeholder: 'Adresă', type: 'text' }
  ];

  constructor() {
    this.form.valueChanges.subscribe(value => {
      localStorage.setItem('company-data', JSON.stringify(value));
    });
  }

  ngAfterViewInit(): void {
    const savedData = localStorage.getItem('company-data');
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
    if (control.errors['pattern']) return 'Formato non valido.';
    return 'Campo non valido.';
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.router.navigate(['homepage/client']);
    }
  }

  nextPage() {
    this.router.navigate(['homepage/client']);
  }

  previousPage() {
    this.router.navigate(['homepage/residence']);
  }
}
