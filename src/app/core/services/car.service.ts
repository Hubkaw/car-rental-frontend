import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarDTO } from '../models/car-dto.model';
import { NewCar } from '../models/new-car.model';

@Injectable({ providedIn: 'root' })
export class CarService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<CarDTO[]> {
    return this.http.get<CarDTO[]>(`${this.apiUrl}/cars`);
  }

  addCar(car: NewCar): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cars/new`, car);
  }
}
