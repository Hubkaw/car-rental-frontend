import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { CarList } from './cars/car-list/car-list';
import { MyRents } from './rents/my-rents/my-rents';
import { AddCar } from './admin/add-car/add-car';
import { UserList } from './admin/user-list/user-list';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'cars', component: CarList, canActivate: [AuthGuard] },
  { path: 'rents', component: MyRents, canActivate: [AuthGuard] },
  { path: 'admin/cars/new', component: AddCar, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/users', component: UserList, canActivate: [AuthGuard, AdminGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
