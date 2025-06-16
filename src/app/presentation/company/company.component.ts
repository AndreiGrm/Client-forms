import { AfterViewInit, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Company } from '../../model/company.model';
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
  router = inject(Router)
  companies: Company[] = [];
  form = this.fb.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(2)]],
    cui: [null, [Validators.required, Validators.pattern(/^[0-9]{8,10}$/)]], // CUI: 8-10 cifre
    tradeRegisterNumber: ['', [Validators.required, Validators.minLength(3)]],
    mainCaen: [null, [Validators.required, Validators.pattern(/^[0-9]{4}$/)]], // CAEN: 4 cifre
    address: ['', [Validators.required, Validators.minLength(5)]],
  });

  fields = [
    { name: 'id', label: 'Id', placeholder: 'Id...', type: 'number' },
    { name: 'name', label: 'Company Name', placeholder: 'Company Name', type: 'text' },
    { name: 'cui', label: 'CUI', placeholder: 'CUI', type: 'text' },
    { name: 'tradeRegisterNumber', label: 'Trade Register No.', placeholder: 'Trade Register No.', type: 'text' },
    { name: 'mainCaen', label: 'CAEN Code', placeholder: 'CAEN Code', type: 'text' },
    { name: 'address', label: 'Address', placeholder: 'Address', type: 'text' }
  ];

  constructor() {
    this.form.valueChanges.subscribe(value => {
      localStorage.setItem('company-data', JSON.stringify(value));
      console.log('Form data saved to localStorage:', value);
    })
  }


  ngAfterViewInit(): void {
    const savedData = localStorage.getItem('company-data');
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
  

  // addCompany(): void {
  //   this.companies.push(companyGroup);
  // }

  // removeCompany(company: Company): void {
  //   this.companies.removeAt(company.id);
  // }


  getErrorMessage(controlName: string, group?: FormGroup): string {
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
      this.router.navigate(['../client']);
    }
    console.log(111);
    
  }

    
  nextPage () {
    this.router.navigate(['../client']);
  }

  previousPage () {
    this.router.navigate(['../residence']);
  }
}
