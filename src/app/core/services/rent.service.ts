import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentDTO } from '../models/rent-dto.model';
import { NewRent } from '../models/new-rent.model';
import { NewAdminRent } from '../models/new-admin-rent.model';

@Injectable({ providedIn: 'root' })
export class RentsService {
  private apiUrl = 'http://kuroneko.ano.ninja:8082/api';

  constructor(private http: HttpClient) {}

  getAllRents(): Observable<RentDTO[]> {
    return this.http.get<RentDTO[]>(`${this.apiUrl}/rents/all`);
  }

  createRent(rent: NewRent): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/rents/create`, rent);
  }

  createAdminRent(rent: NewAdminRent): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/rents/admin/create`, rent);
  }

  returnRent(rentId: number): Observable<string> {
    return this.http.patch(`${this.apiUrl}/rents/${rentId}/return`, {}, { responseType: 'text' });
  }
}
