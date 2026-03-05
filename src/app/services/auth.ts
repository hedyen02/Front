import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  // Register
  register(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          if (response && response.email) {
            localStorage.setItem('currentUser', JSON.stringify(response));
          }
        })
      );
  }

  // Login
  login(email: string, password: string): Observable<User> {
    const loginData = { email, password };

    return this.http.post<User>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => {
          if (response && response.email) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            localStorage.setItem('isLoggedIn', 'true');
          }
        })
      );
  }

  // Logout
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  // Check login
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Get user
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
}