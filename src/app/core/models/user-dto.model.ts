import { RentDTO } from './rent-dto.model';

export interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
  rented: RentDTO[];
}
