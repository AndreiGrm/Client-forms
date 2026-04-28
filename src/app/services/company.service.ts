import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  http = inject(HttpService);

  load() {
    return this.http.load('companies');
  }

  add(company: Partial<Company>) {
    return this.http.add<Partial<Company>>('companies', company);
  }

  update(company: Company) {
    return this.http.update<Company>('companies', company.id, company);
  }

  delete(id: number) {
    return this.http.delete('companies', id);
  }
}
