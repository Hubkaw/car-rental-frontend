import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDTO } from '../../core/models/user-dto.model';
import { NewUser } from '../../core/models/new-user.model';
import {AuthService} from '../../core/services/auth.service';
import {RentsService} from '../../core/services/rent.service';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./user-list.html`
})
export class UserList implements OnInit {
  private auth = inject(AuthService);
  private rentsService = inject(RentsService);
  private userService = inject(UserService);

  users$!: Observable<UserDTO[]>;
  error: string | null = null;

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  createError: string | null = null;
  createSuccess = false;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users$ = this.userService.getAllUsers().pipe(
      catchError(err => {
        this.error = 'Failed to load users';
        return of([]);
      })
    );
  }

  returnCar(rentId: number) {
    this.rentsService.returnRent(rentId).subscribe({
      next: () => this.loadUsers(),
      error: () => (this.error = 'Failed to return car'),
    });
  }

  createUser() {
    const newUser: NewUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };

    this.auth.register(newUser).subscribe({
      next: () => {
        this.createSuccess = true;
        this.createError = null;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.loadUsers();
      },
      error: (err) => {
        this.createError = 'Failed to create user: ' + (err?.error || err.message);
        this.createSuccess = false;
      }
    });
  }
}
