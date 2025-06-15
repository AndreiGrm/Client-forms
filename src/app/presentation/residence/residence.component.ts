import { Component, inject } from '@angular/core';
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
export default class ResidenceComponent {
  private fb = inject(FormBuilder).nonNullable;
  router = inject(Router)
  form = this.fb.group({
    country: [''],
    cityOrSector: [''],
    type: [''],
    streetType: [''],
    streetName: [''],
    number: [null],
    building: [''],
    staircase: [''],
    floor: [null],
    apartment: [null],
  })

  onSubmit(): void {
    console.log(111);
    
    // if (this.form.valid) {
    //   const clientData: Client = this.form.value;
    //   console.log('Form Submitted:', clientData);
    // }
  }
  nextPage () {
    this.router.navigate(['../company']);
  }

  previousPage () {
    this.router.navigate(['']);
  }
}
