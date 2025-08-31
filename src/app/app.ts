import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <nav *ngIf="auth.isAuthenticated()">
      <a routerLink="/cars"><Button class="nav-button">Cars</Button></a>
      <a routerLink="/rents"><Button class="nav-button">My Rents</Button></a>
      <span *ngIf="auth.isAdmin()"><a  routerLink="/admin/cars/new"><Button  class="nav-button">Add Car</Button></a></span>
      <span *ngIf="auth.isAdmin()" ><a  routerLink="/admin/users"><Button class="nav-button">Users</Button></a></span>
      <button (click)="logout()" class="logout-button">Logout</button>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class App {
  auth = inject(AuthService);
  router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
