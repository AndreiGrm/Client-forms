import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Client } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  http = inject(HttpService);

  load() {
    return this.http.load('clients');
  }

  add(client: Partial<Client>) {
    return this.http.add<Partial<Client>>('clients', client);
  }

  delete(id: number) {
    return this.http.delete('clients', id);
  }
}
