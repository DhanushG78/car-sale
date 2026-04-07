export type FuelType = "petrol" | "diesel" | "electric";
export type Transmission = "manual" | "automatic";
export type OwnerType = "1st" | "2nd" | "3rd";
export type CarCategory = "sedan" | "suv" | "hatchback" | "coupe" | "convertible" | "truck";

export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: FuelType;
  transmission: Transmission;
  kmDriven: number;
  ownerType: OwnerType;
  location: string;
  color: string;
  description: string;
  image: string;
  sellerId: string;
  createdAt: string;
  category: CarCategory;
  badge?: "new" | "best-deal";
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Filters {
  priceRange: [number, number];
  brand: string;
  year: string;
  fuelType: string;
  transmission: string;
  kmDriven: string;
  ownerType: string;
  location: string;
  category: string;
  search: string;
}
