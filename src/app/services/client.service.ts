import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Client } from '../model/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  http = inject(HttpService);

  load () {
    return this.http.load('clients')
  }

  add<Client>(client: Client) {
    
    return this.http.add('clients', client);
  }

  delete (id: number) {
    return this.http.delete('clients', id);
  }

}