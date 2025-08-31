export interface CarDTO {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  availability: 'AVAILABLE' | 'RENTED' | 'OVERDUE' | 'RETURNED' | 'SCHEDULED';
  imageLink?: string;
}
