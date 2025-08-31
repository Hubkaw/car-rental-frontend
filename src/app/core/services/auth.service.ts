import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from '../models/token-response.model';
import { NewUser } from '../models/new-user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private tokenKey = 'jwt_token';
  private isAdminKey = 'is_admin';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<TokenResponse> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`),
    });

    return this.http.get<TokenResponse>(`${this.apiUrl}/login`, { headers }).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.token);
        this.checkAdminStatus();
      })
    );
  }

  register(user: NewUser): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, user);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.isAdminKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return localStorage.getItem(this.isAdminKey) === 'true';
  }

  private checkAdminStatus(): void {
    this.http.get(`${this.apiUrl}/users/all`).subscribe({
      next: () => localStorage.setItem(this.isAdminKey, 'true'),
      error: () => localStorage.setItem(this.isAdminKey, 'false'),
    });
  }
}
