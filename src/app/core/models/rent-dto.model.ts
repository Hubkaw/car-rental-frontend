export interface RentDTO {
  id: number;
  rentStart: Date;
  rentEnd: Date;
  rentPrice: number;
  carStatus: 'AVAILABLE' | 'RENTED' | 'OVERDUE' | 'RETURNED' | 'SCHEDULED';
  returnTime?: Date;
  carBrand: string;
  carModel: string;
  email: string;
}
