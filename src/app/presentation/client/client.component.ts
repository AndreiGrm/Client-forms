import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Client } from '../../model/client.model';
import { Company } from '../../model/company.model';
import { Residence } from '../../model/residence.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ]
})
export default class ClientComponent implements OnInit {
  router = inject(Router);
  client: Client | null = null;

  ngOnInit(): void {
    const companyData = localStorage.getItem('company-data');
    const residenceData = localStorage.getItem('residence-data');
    const clientData = localStorage.getItem('client-data');

    if (companyData && residenceData && clientData) {
      this.client = {
        ...JSON.parse(clientData),
        companies: JSON.parse(companyData) as Company,
        residence: JSON.parse(residenceData) as Residence
      } as Client;
    } else {
      this.client = null;
    }
  }

  previousPage() {
    this.router.navigate(['homepage/client-form']);
  }
}
