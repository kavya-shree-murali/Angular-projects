
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiservice } from './api.service';
export function checkNull(value){
  return value != '' && value != undefined && value!= null
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private apiService: Apiservice
  ) { }

  makeHttpRequest(pagination) : Observable<any>{
    let params = new HttpParams();
    for (let data in pagination) {
      if (checkNull(pagination[data])) {
        params = params.append(data, pagination[data]);
      }
    }
   return this.apiService.get('/products', params)
  }
}