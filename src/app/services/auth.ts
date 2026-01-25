// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

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
  private apiUrl = 'http://localhost:8080/api/auth'; // Port Spring Boot par défaut

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode d'inscription
  register(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          // Stocker les informations utilisateur si nécessaire
          if (response && response.email) {
            localStorage.setItem('currentUser', JSON.stringify(response));
          }
        })
      );
  }

  // Méthode de connexion
  login(email: string, password: string): Observable<User> {
    const loginData = { email, password };
    return this.http.post<User>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => {
          // Stocker les informations utilisateur dans localStorage
          if (response && response.email) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            localStorage.setItem('isLoggedIn', 'true');
          }
        })
      );
  }

  // Méthode de déconnexion
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Obtenir l'utilisateur courant
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
}