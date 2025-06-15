import { Company } from "./company.model";
import { Residence } from "./residence.model";

export interface Client {
  idType: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  citizenship: string;
  birthDate: Date;
  nationalId: number; // CNP
  series: string;
  number: number;
  birthCountry: string;
  birthCity: string;
  issuer: string;
  issueDate: Date;
  expiryDate: Date;

  companies: Company;
  residence: Residence;
}