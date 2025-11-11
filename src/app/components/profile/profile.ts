import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  userId: number = 0;
  username = '';
  firstName = '';
  lastName = '';
  email = '';
  joinDate = '';

  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;

  deleteUserMessage: string | null = null;
  errorDeleteMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.id;
        this.username = user.username;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.email = user.email;
        this.joinDate = user.date_joined.split('T')[0];
      }
    });
  }

  changePassword() {
    if (this.passwordForm.invalid) return;

    const currentPassword = this.passwordForm.value.currentPassword!;
    const newPassword = this.passwordForm.value.newPassword!;
    const confirmPassword = this.passwordForm.value.confirmPassword!;

    if (newPassword !== confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }

    this.authService.changePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.successMessage = "Password changed successfully.";
        this.errorMessage = null;
        this.passwordForm.reset();
      },
      error: (err) => {
        this.errorMessage = "Failed to change password.";
        this.successMessage = null;
        console.error(err);
      }
    });
  }

  deleteAccount() {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    this.authService.deleteAccount(this.userId).subscribe().unsubscribe();
    this.authService.logout();
    this.deleteUserMessage = 'Your account has been deleted.';
    setTimeout(
      () => {
        this.router.navigate(['/login']);
      }, 100
    )
    this.deleteUserMessage = null;
  }
}
