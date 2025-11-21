export interface CarDetails {
  id?: number;
  brand: string;
  model: string;
  year: number;
  color?: string;
}

export interface Car {
  id: number;
  owner: number;
  owner_username?: string;
  owner_name?: string;
  car_details: CarDetails;
  license: string;
  created_at?: string;
  updated_at?: string;
}
