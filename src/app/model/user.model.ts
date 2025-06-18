export interface User {
  user_id: number;
  user_name: string;
  account_id: number;
  is_admin: boolean;
  is_owner: boolean;
  email: string;
  pw: string;
  created_at: Date;
}