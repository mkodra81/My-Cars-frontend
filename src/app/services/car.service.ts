import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Car, CarDetails } from '../models/cars';
import { environment } from '../../environments/environment';

export interface CarCreatePayload {
  car_details: CarDetails;
  license: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = `${environment.apiUrl}/cars/`; // your backend URL

  // BehaviorSubject to store and emit the latest car list
  private carsSubject = new BehaviorSubject<Car[]>([]);
  cars$ = this.carsSubject.asObservable(); // components subscribe to this

  constructor(private http: HttpClient) {}

  // Fetch all cars from backend
  loadCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl).pipe(
      tap((cars) => {
        this.carsSubject.next(cars);
      })
    );
  }

  // Add new car
  addCar(carData: CarCreatePayload): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, carData).pipe(
      tap((car) => {
        const updated = [...this.carsSubject.value, car];
        this.carsSubject.next(updated);
      })
    );
  }

  // Add new car for specific owner (admin only)
  addCarForOwner(ownerId: number, carData: CarCreatePayload): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}owner/${ownerId}/`, carData).pipe(
      tap((car) => {
        const updated = [...this.carsSubject.value, car];
        this.carsSubject.next(updated);
      })
    );
  }

  // Update car
  updateCar(carId: number, carData: CarCreatePayload): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}${carId}/`, carData).pipe(
      tap((car) => {
        const updated = this.carsSubject.value.map((c) =>
          c.id  === car.id ? car : c
        );
        this.carsSubject.next(updated);
      })
    );
  }

  // Delete car
  deleteCar(carId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${carId}/`).pipe(
      tap(() => {
        const updated = this.carsSubject.value.filter((c) => c.id !== carId);
        this.carsSubject.next(updated);
      })
    );
  }
}
