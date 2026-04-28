import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  http = inject(HttpClient);
  path = environment.apiUrl;

  load(param: string) {
    return this.http.get(this.path + param);
  }

  add<T>(param: string, newValue: T) {
    return this.http.post(this.path + param, newValue);
  }

  update<T>(param: string, id: number, updatedValue: T) {
    return this.http.put(this.path + param + '/' + id, updatedValue);
  }

  delete(param: string, id: number) {
    return this.http.delete(this.path + param + '/' + id);
  }
}
