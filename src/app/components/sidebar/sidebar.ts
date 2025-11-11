import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  imports: [
    NgIf
  ]
})
export class Sidebar implements OnInit, OnDestroy {
  currentUser: User | null = null;
  username: string = '';
  email: string = '';
  is_superuser: boolean = false;
  private subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.username = user?.username || '';
      this.email = user?.email || '';
      this.is_superuser = user?.is_superuser || false;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // redirect after logout
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toUsers() {
    if(this.is_superuser) {
      this.router.navigate(['/dashboard/admin/users']);
      return;
    }

    this.router.navigate(['/dashboard/users']);
  }

  toCars() {
    if(this.is_superuser) {
      this.router.navigate(['/dashboard/admin/cars']);
      return;
    }

    this.router.navigate(['/dashboard/cars']);
  }

  toProfile() {
    if(this.is_superuser) {
      this.router.navigate(['/dashboard/admin/profile']);
      return;
    }

    this.router.navigate(['/dashboard/profile']);
  }
}
