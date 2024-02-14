import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commerce, Computer } from './fetch.interface'; 


@Injectable({
  providedIn: 'root'
})
export class FetchService {
  private baseUrl = 'https://random-data-api.com/api';

  constructor(private http: HttpClient) {};
  
  getCommerces(count: number): Observable<Commerce[]> {
   return this.http.get<Commerce[]>(`${this.baseUrl}/commerce/random_commerce?size=${count}`);
  }
  getComputer(count: number): Observable<Computer[]> {
   return this.http.get<Computer[]>(`${this.baseUrl}/computer/random_computer?size=${count}`);
  }
}
