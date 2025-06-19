import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  http = inject(HttpService);

  load () {
    return this.http.load('clients')
  }

}