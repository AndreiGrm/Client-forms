import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  http = inject(HttpClient);
  path = 'http://localhost:3000/';

  load (param: string) {
    return this.http.get(this.path + param)
  }

  add<T>(param: string, newValue: T) {
    console.log('wewe');
    
     let a =  this.http.post(this.path + param, newValue)
     .subscribe({
            next: (data) => {
               console.log(data);
               
             },
             error: (error) => {
               console.error('Error loading clients:', error);
             }
         });
     return a
  }

  delete (param: string, id: number) {
    return this.http.delete(this.path + param + '/' + id)
  }

  // update<T extends { id: number }>(param: string, updatedValue: T, silentUpdate: boolean = false): Response<T> | ResponseError {
  //   try {
  //     const response = this.load<T>(param);

  //     if (this.isResponseError(response)) {
  //       throw new Error();
  //     }

  //     const elements = response.data;


  //     const updatedElements = elements.map(el => el.id === updatedValue.id ? updatedValue : el)

  //     localStorage.setItem(param, JSON.stringify(updatedElements));


  //     if (!silentUpdate){
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record sucesfully updated' });
  //     }
  //     return {
  //       status: 200,
  //       data: updatedValue
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error while updating record' });
  //     return {
  //       status: 404,
  //       message: 'Error while updating record'
  //     }
  //   }
  // }

  // delete <T extends { id: number }>(param: string, id: number): Response<null> | ResponseError {
  //   try {
  //     const response = this.load<T>(param);

  //     if (this.isResponseError(response)) {
  //       throw new Error();
  //     }

  //     const elements = response.data;

  //     localStorage.setItem(param, JSON.stringify(elements.filter(el => el.id !== id)));

  //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record sucesfully deleted' });
  //     return {
  //       status: 200,
  //       data: null
  //     }
  //   } catch (error) {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error while deleting record' });
  //     return {
  //       status: 404,
  //        message: 'Error while deleting record'
  //     }
  //   }
  // }

  // getById <T extends { id: number }>(from:string, param: string, id: number | null): Response<T | undefined> | ResponseError{
  //   try {
  //     const response = this.load<T>(from);

  //     if (this.isResponseError(response)) {
  //       throw new Error();
  //     }
      
  //     const elements = response.data;
      
  //     if (!id) {
  //       const lastSelected = localStorage.getItem(param);
  //       if (lastSelected && lastSelected!== '' && this.isValidId<T>(from, Number(lastSelected))) {
  //         localStorage.setItem(param, lastSelected);
  //       } else {
  //         localStorage.setItem(param, '');
  //       }
  //     } else {
  //       if (this.isValidId<T>(from, id)) {
  //         localStorage.setItem(param, id.toString());
  //       } else {
  //         localStorage.setItem(param, '');
  //       }
  //     }
  //     const element = elements.find(el => el.id === Number(localStorage.getItem(param)))


  //     return {
  //       status: 200,
  //       data: element
  //     }

  //   } catch (error) {
  //     console.error("Error:", error);
  //     return {
  //       status: 404,
  //       message: 'Error while loading record'
  //     }
  //   }
    
  // }


  // isValidId <T extends { id: number }>(from: string, id: number) {
  //     if (!id) return false
  //     const response = this.load<T>(from);

  //     if (this.isResponseError(response)) {
  //       throw new Error();
  //     }

  //     const elements = response.data;

  //     const valid = elements.find(r => r.id === id);

  //     if (valid && valid.id) {
  //       return true
  //     } else {
  //       return false
  //     }
  // }

  // getBy <T  extends Record<string, any>>(from: string, param: string, value: string): Response<T[]> | ResponseError {
  //   try {
  //     const response = this.load<T>(from);

  //     if (this.isResponseError(response)) {
  //       throw new Error();
  //     }

  //     const elements = response.data;


  //     const results = elements.filter(el =>
  //       typeof el[param] === 'string' && el[param].toLowerCase().includes(value.toLowerCase())
  //     );

  //     return {
  //       status: 200,
  //       data: results
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return {
  //       status: 404,
  //       message: 'Error while loading record'
  //     }
  //   }
  // }

  // isResponseError(obj: any): obj is ResponseError {
  //   return obj && typeof obj.error === 'string';
  // }

}

type Response<T> = {
  status: number,
  data: T
}

type ResponseError = {
  status: number,
  message: string 
}