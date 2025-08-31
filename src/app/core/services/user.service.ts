import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user-dto.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://kuroneko.ano.ninja:8082/api';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/users/all`);
  }
}
