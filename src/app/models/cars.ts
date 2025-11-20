export interface CarDetails {
  id?: number;
  brand: string;
  model: string;
  year: number;
  color?: string;
}

export interface Car {
  id: number;
  owner: number;  // owner ID
  owner_username?: string;  // for display purposes
  owner_name?: string;  // for display purposes
  car_details: CarDetails;
  license: string;
  created_at?: string;
  updated_at?: string;
}
