import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
  form = this.fb.group({
    idType: this.fb.control(''),
    lastName: this.fb.control('', Validators.required),
    firstName: this.fb.control('', Validators.required),
    citizenship: this.fb.control(''),
    birthDate: this.fb.control(null),
    nationalId: this.fb.control(null),
    series: this.fb.control(''),
    number: this.fb.control(null),
    birthCountry: this.fb.control(''),
    birthCity: this.fb.control(''),
    issuer: this.fb.control(''),
    issueDate: this.fb.control(null),
    expiryDate: this.fb.control(null),

    residence: this.fb.group({
      country: this.fb.control(''),
      cityOrSector: this.fb.control(''),
      type: this.fb.control(''),
      streetType: this.fb.control(''),
      streetName: this.fb.control(''),
      number: this.fb.control(null),
      building: this.fb.control(''),
      staircase: this.fb.control(''),
      floor: this.fb.control(null),
      apartment: this.fb.control(null),
    }),

    companies: this.fb.array([]),
  });

  get residenceForm(): FormGroup {
    return this.form.get('residence') as FormGroup;
  }

  get companies(): FormArray<FormGroup> {
    return this.form.get('companies') as FormArray<FormGroup>;
  }
  

  addCompany(): void {
    console.log(this.form.get('residence'));
    
    const companyGroup = this.fb.group({
      id: [null],
      name: [''],
      cui: [null],
      tradeRegisterNumber: [''],
      mainCaen: [null],
      address: [''],
    });

    this.companies.push(companyGroup);
  }

  removeCompany(company: Company): void {
    this.companies.removeAt(company.id);
  }

  onSubmit(): void {
    console.log(111);
    
    // if (this.form.valid) {
    //   const clientData: Client = this.form.value;
    //   console.log('Form Submitted:', clientData);
    // }
  }
}
