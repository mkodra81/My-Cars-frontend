import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Token} from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('access');
    if (token) {
      this.loadCurrentUser().subscribe();
    }
  }

  /** Load current user info */
  loadCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me/`).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  /** Login and store tokens */
  login(credentials: {
    username: string;
    password: string;
  }): Observable<Token> {
    return this.http
      .post<Token>(`${this.baseUrl}/token/`, credentials)
      .pipe(
        tap((res) => {
          localStorage.setItem('access', res.access);
          localStorage.setItem('refresh', res.refresh);
          this.loadCurrentUser().subscribe();
        })
      );
  }

  /** Register new user */
  register(userData: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/`, userData);
  }

  /** Logout user */
  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);

  }

  /** Helpers */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access');
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/change-password/`, {
      old_password: currentPassword,
      new_password: newPassword
    });
  }

  deleteAccount(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}/`);
  }
}
