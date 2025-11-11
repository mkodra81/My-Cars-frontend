import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = environment.apiUrl;

  // BehaviorSubject to store and emit the latest user list
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();


  constructor(private http: HttpClient) {}

  /** ========== USER MANAGEMENT ========== */

  // Load all users
  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin/users/`).pipe(
      tap((users) => this.usersSubject.next(users))
    );
  }

  // Get a single user by ID
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/admin/users/${userId}/`);
  }

  // Create a new user
  createUser(userData: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    is_superuser?: boolean;
  }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/admin/users/`, userData).pipe(
      tap((user) => {
        const updated = [...this.usersSubject.value, user];
        this.usersSubject.next(updated);
      })
    );
  }

  // Update an existing user
  updateUser(userId: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/admin/users/${userId}/`, userData).pipe(
      tap((updatedUser) => {
        const updated = this.usersSubject.value.map((u) =>
          u.userId === updatedUser.userId ? updatedUser : u
        );
        this.usersSubject.next(updated);
      })
    );
  }

  // Delete a user
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/users/${userId}/`).pipe(
      tap(() => {
        const updated = this.usersSubject.value.filter((u) => u.userId !== userId);
        this.usersSubject.next(updated);
      })
    );
  }
}


