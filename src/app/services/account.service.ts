import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  http = inject(HttpService);

  getAccount() {
    return this.http.load('accounts/1');
  }
}