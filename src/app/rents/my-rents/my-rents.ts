import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RentDTO } from '../../core/models/rent-dto.model';
import {RentsService} from '../../core/services/rent.service';

@Component({
  selector: 'app-my-rents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./my-rents.html`
})
export class MyRents implements OnInit {

  private rentsService = inject(RentsService);

  rents$!: Observable<RentDTO[]>;
  error: string | null = null;

  ngOnInit() {
    this.loadRents();
  }

  loadRents() {
    this.rents$ = this.rentsService.getAllRents().pipe(
      catchError((err) => {
        this.error = 'Failed to load rents';
        return of([]);
      })
    );
  }

  returnCar(rentId: number) {
    this.rentsService.returnRent(rentId).subscribe({
      next: () => this.loadRents(),
      error: () => (this.error = 'Failed to return car'),
    });
  }
}
