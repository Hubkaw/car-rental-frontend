import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: `./login.html`,
})
export class Login {
  email = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: (err) => (this.error = 'Login failed, please provide valid user and password.'),
    });
  }
}
