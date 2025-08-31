import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { NewUser } from '../../core/models/new-user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: `./register.html`,
})
export class Register {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const user: NewUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };
    this.auth.register(user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => (this.error = 'Registration failed: ' + err.message),
    });
  }
}
