export interface Company {
  id: number;
  name: string;
  cui: number; // Unique Identification Code
  tradeRegisterNumber: string;
  mainCaen: number; // Main CAEN activity code
  address: string;
}