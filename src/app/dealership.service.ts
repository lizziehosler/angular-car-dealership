import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dealership } from './shared/models/dealership';


@Injectable({
  providedIn: 'root'
})
export class DealershipService {
  private carApi: string;

  constructor(
    private http: HttpClient
  ) {
    this.carApi = `${environment.apiUrl}api/v1/dealerships`;
   }

   getAllDealerships(): Observable<Dealership[]> {
     return this.http.get<Dealership[]>(`${this.carApi}/index`)
   }

   getDealershipById(params) {
     return this.http.get<any>(`${this.carApi}/getDealershipById?id=${params.id}`)
   }
}
