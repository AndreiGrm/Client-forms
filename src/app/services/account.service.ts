import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpService);
  private authService = inject(AuthService);

  getAccount() {
    const accountId = this.authService.accountId();
    return this.http.load(accountId ? `accounts/${accountId}` : 'accounts/1');
  }
}
