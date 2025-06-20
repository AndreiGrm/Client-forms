export interface Company {
  id: number;
  client_id: number;
  company_name: string;
  cui: number; // Unique Identification Code
  tradeRegisterNumber: string;
  mainCaen: number; // Main CAEN activity code
  address: string;
  created_at: Date;
}