import { Component, inject, OnInit } from '@angular/core';
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
export default class CompanyComponent implements OnInit {
  private fb = inject(FormBuilder).nonNullable;
  router = inject(Router)
   form = this.fb.group({
    companies: this.fb.array([]),
  });

  get companies(): FormArray<FormGroup> {
    return this.form.get('companies') as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    this.addCompany()
  }
  

  addCompany(): void {
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

  previousPage () {
    this.router.navigate(['../residence']);
  }
}
