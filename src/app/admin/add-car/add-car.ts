import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {inject} from '@angular/core';
import {NewCar} from '../../core/models/new-car.model';
import {CarService} from '../../core/services/car.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./add-car.html`,
})
export class AddCar {

  private carService = inject(CarService);

  imageLink = '';
  brand = '';
  model = '';
  year = 0;
  pricePerDay = 0;
  error: string | null = null;
  success = false;

  addCar() {

    const dto: NewCar = {
      imageLink: this.imageLink,
      brand: this.brand,
      model: this.model,
      year: this.year,
      pricePerDay: this.pricePerDay,
    };

    this.carService.addCar(dto).subscribe({
      next: () => {
        this.success = true;
        this.error = null;
      },
      error: (err) => (this.error = 'Failed to add car: ' + (err?.error || err.message)),
    });
  }
}
