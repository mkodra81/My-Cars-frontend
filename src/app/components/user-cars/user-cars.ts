import { Component } from '@angular/core';
import { CarManagement } from '../shared/car-management';

@Component({
  selector: 'app-user-cars',
  imports: [CarManagement],
  templateUrl: './user-cars.html',
  styleUrl: './user-cars.css',
  standalone: true
})
export class UserCars {}
