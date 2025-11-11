import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { Layout } from './pages/layout/layout';
import { AdminDashboard } from './components/admin.dashboard/admin.dashboard';
import { Cars } from './components/cars/cars';
import { UserCars } from './components/user-cars/user-cars';
import { Profile } from './components/profile/profile';
import { Users } from './components/users/users';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'dashboard',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: Dashboard,
        children: [
          {
            path: '',
            redirectTo: 'cars',
            pathMatch: 'full'
          },
          {
            path: 'cars',
            component: Cars
          },
          {
            path: 'profile',
            component: Profile
          }
        ]
      },
      {
        path: 'admin',
        component: AdminDashboard,
        children: [
          {
            path: '',
            redirectTo: 'users',
            pathMatch: 'full'
          },
          {
            path: 'users',
            component: Users
          },
          {
            path: 'profile',
            component: Profile
          },
          {
            path: 'cars',
            component: Cars
          }
        ]
      }
    ]
  }
];
