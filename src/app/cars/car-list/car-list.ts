import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CarDTO } from '../../core/models/car-dto.model';
import { AuthService } from '../../core/services/auth.service';
import {NewAdminRent} from '../../core/models/new-admin-rent.model';
import {NewRent} from '../../core/models/new-rent.model';
import {RentsService} from '../../core/services/rent.service';
import {CarService} from '../../core/services/car.service';
import {UserService} from '../../core/services/user.service';

interface UserOption {
  name: string;
  email: string;
}

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./car-list.html`
})
export class CarList implements OnInit {
  private auth = inject(AuthService);
  private rentsService = inject(RentsService);
  private carService = inject(CarService);
  private userService = inject(UserService);

  cars$!: Observable<CarDTO[]>;
  error: string | null = null;

  selectedCar: CarDTO | null = null;
  rentStart!: string;
  rentEnd!: string;
  modalError: string | null = null;

  users: UserOption[] = [];
  selectedUserEmail!: string;

  ngOnInit() {
    this.loadCars();

    if (this.auth.isAdmin()) {
      this.loadUsers();
    }
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  loadCars() {
    this.cars$ = this.carService.getAllCars().pipe(
      catchError(err => {
        this.error = 'Failed to load cars';
        return of([]);
      })
    );
  }

  loadUsers() {
    this.userService.getAllUsers().pipe(
      map(users => users.map(u => ({ name: u.firstName + ' ' + u.lastName, email: u.email }))),
      catchError(() => of([]))
    ).subscribe(result => this.users = result);
  }

  openRentModal(car: CarDTO) {
    this.selectedCar = car;
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    this.rentStart = now.toISOString().slice(0,16);
    this.rentEnd = tomorrow.toISOString().slice(0,16);
    this.modalError = null;

    if (this.auth.isAdmin() && this.users.length) {
      this.selectedUserEmail = this.users[0].email;
    }
  }

  closeRentModal() {
    this.selectedCar = null;
    this.modalError = null;
  }

  confirmRent() {
    if (!this.selectedCar) return;

    if (new Date(this.rentEnd) <= new Date(this.rentStart)) {
      this.modalError = 'End date must be after start date';
      return;
    }

    if (this.auth.isAdmin()) {
      const body: NewAdminRent = {
        id: this.selectedCar.id,
        email: this.selectedUserEmail,
        startDate: new Date(this.rentStart),
        endDate: new Date(this.rentEnd)
      };

      this.rentsService.createAdminRent(body).subscribe({
        next: () => {
          this.loadCars();
          this.closeRentModal();
        },
        error: () => this.modalError = 'Failed to rent car'
      });
    } else {
      const body: NewRent = {
        id: this.selectedCar.id,
        startDate: new Date(this.rentStart),
        endDate: new Date(this.rentEnd)
      };

      this.rentsService.createRent(body).subscribe({
        next: () => {
          this.loadCars();
          this.closeRentModal();
        },
        error: () => this.modalError = 'Failed to rent car'
      });
    }
  }
}
