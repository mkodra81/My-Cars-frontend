import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';
import { Car } from '../../models/cars';
import { User } from '../../models/user';

@Component({
  selector: 'app-car-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './car-management.html',
  styleUrls: ['./car-management.css']
})
export class CarManagement implements OnInit, OnDestroy {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  currentUser: User | null = null;
  isAdmin = false;

  // Filter property
  usernameFilter: string = '';

  addCarForm: FormGroup;
  editCarForm: FormGroup;
  editingCar: Car | null = null;
  showAddForm = false;

  addSuccessMessage = '';
  addErrorMessage = '';
  editSuccessMessage = '';
  editErrorMessage = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private carService: CarService,
    private authService: AuthService
  ) {
    this.addCarForm = new FormGroup({
      brand: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      year: new FormControl('', [Validators.required, Validators.min(1900)]),
      license: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
    });

    this.editCarForm = new FormGroup({
      brand: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      year: new FormControl('', [Validators.required, Validators.min(1900)]),
      license: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    // Check if user is admin
    const userSub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.isAdmin = user?.is_superuser || false;

      // Subscribe to cars$ observable first
      const carsSub = this.carService.cars$.subscribe((cars: Car[]) => {
        this.cars = cars;
        this.applyFilter();
      });
      this.subscriptions.push(carsSub);

      // Load cars after subscribing - this triggers the HTTP request
      this.carService.loadCars().subscribe({
        error: (err) => console.error('Failed to load cars:', err)
      });
    });
    this.subscriptions.push(userSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.addCarForm.reset();
      this.addSuccessMessage = '';
      this.addErrorMessage = '';
    }
  }

  addCar() {
    if (this.addCarForm.invalid) return;

    const carData = this.addCarForm.value;

    this.carService.addCar(carData).subscribe({
      next: () => {
        this.addSuccessMessage = 'Car added successfully!';
        this.addErrorMessage = '';
        this.addCarForm.reset();
        setTimeout(() => {
          this.addSuccessMessage = '';
          this.showAddForm = false;
        }, 2000);
      },
      error: (err: any) => {
        this.addErrorMessage = 'Failed to add car.';
        this.addSuccessMessage = '';
        console.error(err);
      }
    });
  }

  editCar(car: Car) {
    this.editingCar = car;
    this.editCarForm.patchValue({
      brand: car.brand,
      model: car.model,
      year: car.year,
      license: car.license,
      color: car.color
    });
    this.editSuccessMessage = '';
    this.editErrorMessage = '';
  }

  updateCar() {
    if (this.editCarForm.invalid || !this.editingCar) return;

    const updatedData = this.editCarForm.value;

    this.carService.updateCar(this.editingCar.id, updatedData).subscribe({
      next: () => {
        this.editSuccessMessage = 'Car updated successfully!';
        this.editErrorMessage = '';
        setTimeout(() => {
          this.editSuccessMessage = '';
          this.editingCar = null;
        }, 2000);
      },
      error: (err: any) => {
        this.editErrorMessage = 'Failed to update car.';
        this.editSuccessMessage = '';
        console.error(err);
      }
    });
  }

  cancelEdit() {
    this.editingCar = null;
    this.editSuccessMessage = '';
    this.editErrorMessage = '';
  }

  deleteCar(carId: number) {
    if (!confirm('Are you sure you want to delete this car?')) return;

    this.carService.deleteCar(carId).subscribe({
      next: () => {
        // Car list will be updated automatically via CarService
      },
      error: (err: any) => {
        console.error('Failed to delete car:', err);
      }
    });
  }

  getOwnerName(car: Car): string {
    return car.owner
  }

  applyFilter() {
    if (!this.usernameFilter.trim()) {
      this.filteredCars = this.cars;
    } else {
      const filterLower = this.usernameFilter.toLowerCase().trim();
      this.filteredCars = this.cars.filter(car =>
        car.owner && car.owner.toLowerCase().includes(filterLower)
      );
    }
  }

  onFilterChange() {
    this.applyFilter();
  }

  clearFilter() {
    this.usernameFilter = '';
    this.applyFilter();
  }
}
