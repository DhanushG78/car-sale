export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic";
  kmDriven: number;
  ownerType: "1st" | "2nd" | "3rd" | "4th+";
  location: string;
  color: string;
  description: string;
  image: string;
  sellerId: string;
  createdAt: string;
  status: "available" | "sold";
}

export interface CarFilters {
  searchTerm?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: string;
  transmission?: string;
  kmDriven?: number;
  ownerType?: string;
  location?: string;
}

