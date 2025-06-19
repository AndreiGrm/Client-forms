import { Company } from "./company.model";
import { Residence } from "./residence.model";

export interface Client {
  id: number;
  account_id: number;
  idType: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  citizenship: string;
  birthDate: Date;
  nationalId: number;
  series: string;
  number: number;
  birthCountry: string;
  birthCity: string;
  issuer: string;
  issueDate: Date;
  expiryDate: Date;
  created_at: Date;
  companies: Company;
  residence: Residence;
}