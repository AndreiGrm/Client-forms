export interface Invitation {
  id?: number;
  email: string;
  account_id: number;
  token?: string;
  status: 'pending' | 'accepted' | 'expired';
  created_at?: Date;
}
