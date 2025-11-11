import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit, OnDestroy {
  users: User[] = [];

  addUserForm: FormGroup;
  editUserForm: FormGroup;
  editingUser: User | null = null;
  showAddForm = false;

  addSuccessMessage = '';
  addErrorMessage = '';
  editSuccessMessage = '';
  editErrorMessage = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {
    this.addUserForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      is_superuser: new FormControl(false),
    });

    this.editUserForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      is_superuser: new FormControl(false),
    });
  }

  ngOnInit() {
    // Load users
    this.adminService.loadUsers().subscribe();

    const usersSub = this.adminService.users$.subscribe((users: User[]) => {
      this.users = users;
    });
    this.subscriptions.push(usersSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.addUserForm.reset({ is_superuser: false });
      this.addSuccessMessage = '';
      this.addErrorMessage = '';
    }
  }

  addUser() {
    if (this.addUserForm.invalid) return;

    const userData = this.addUserForm.value;

    this.adminService.createUser(userData).subscribe({
      next: () => {
        this.addSuccessMessage = 'User added successfully!';
        this.addErrorMessage = '';
        this.addUserForm.reset({ is_superuser: false });
        setTimeout(() => {
          this.addSuccessMessage = '';
          this.showAddForm = false;
        }, 2000);
      },
      error: (err: any) => {
        this.addErrorMessage = err.error?.message || 'Failed to add user.';
        this.addSuccessMessage = '';
        console.error(err);
      }
    });
  }

  editUser(user: User) {
    this.editingUser = user;
    this.editUserForm.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      is_superuser: user.is_superuser
    });
    this.editSuccessMessage = '';
    this.editErrorMessage = '';
  }

  updateUser() {
    if (this.editUserForm.invalid || !this.editingUser) return;

    console.log('Editing user:', this.editingUser);
    const userId = this.editingUser.id;
    console.log('User ID:', userId);

    if (!userId) {
      this.editErrorMessage = 'User ID not found';
      return;
    }

    const updatedData = this.editUserForm.value;

    this.adminService.updateUser(userId, updatedData).subscribe({
      next: () => {
        this.editSuccessMessage = 'User updated successfully!';
        this.editErrorMessage = '';
        setTimeout(() => {
          this.editSuccessMessage = '';
          this.editingUser = null;
        }, 2000);
      },
      error: (err: any) => {
        this.editErrorMessage = err.error?.message || 'Failed to update user.';
        this.editSuccessMessage = '';
        console.error(err);
      }
    });
  }

  cancelEdit() {
    this.editingUser = null;
    this.editSuccessMessage = '';
    this.editErrorMessage = '';
  }

  deleteUser(userId: number) {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    this.adminService.deleteUser(userId).subscribe({
      next: () => {
        // User list will be updated automatically via AdminService
      },
      error: (err: any) => {
        console.error('Failed to delete user:', err);
        alert('Failed to delete user. ' + (err.error?.message || ''));
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
