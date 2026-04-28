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
  birthDate: Date | null;
  nationalId: string;
  series: string;
  number: string;
  birthCountry: string;
  birthCity: string;
  issuer: string;
  issueDate: Date | null;
  expiryDate: Date | null;
  created_at: Date;
  companies: Company;
  residence: Residence;
}