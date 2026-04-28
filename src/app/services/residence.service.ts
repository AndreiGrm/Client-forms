import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Residence } from '../model/residence.model';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  http = inject(HttpService);

  load() {
    return this.http.load('residences');
  }

  add(residence: Partial<Residence>) {
    return this.http.add<Partial<Residence>>('residences', residence);
  }

  update(residence: Residence) {
    return this.http.update<Residence>('residences', residence.id, residence);
  }

  delete(id: number) {
    return this.http.delete('residences', id);
  }
}
