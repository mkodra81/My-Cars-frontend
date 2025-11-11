import { Component } from '@angular/core';
import { CarManagement } from '../shared/car-management';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CarManagement],
  templateUrl: './cars.html',
  styleUrl: './cars.css'
})
export class Cars {}
