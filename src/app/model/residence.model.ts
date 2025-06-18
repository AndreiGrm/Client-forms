export interface Residence {
  residence_id: number;
  client_id: number;
  country: string;
  cityOrSector: string;
  type: string; // e.g., Home, Apartment, etc.
  streetType: string; // e.g., Boulevard, Street, Alley, etc.
  streetName: string;
  number: number;
  building: string;
  staircase: string;
  floor: number;
  apartment: number;
  created_at: Date;
}