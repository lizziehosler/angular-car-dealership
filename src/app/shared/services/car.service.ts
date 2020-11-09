import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carApi: string;

  constructor(
    private http: HttpClient
  ) {
    this.carApi = `${environment.apiUrl}api/v1/cars`;
   }

   getAllCars(): Observable<Car[]> {
     return this.http.get<Car[]>(`${this.carApi}/index`)
   }

   getCarById(params) {
     return this.http.get<any>(`${this.carApi}/getCarById?id=${params.id}`)
   }
}
