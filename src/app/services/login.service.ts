import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpService);

  login (username: string | undefined, password: string | undefined) {
    return this.http.load(`users?user_name=${username}&pw=${password}`);
  }
}