import { Car, CarFilters } from '../types';

/**
 * A generic CRUD service for the marketplace entity.
 * In a real application, this would use fetch, axios, or a Firebase SDK.
 * For now, this mimics network requests with Promises and localStorage or in-memory array.
 */

// Mock storage
let mockCars: Car[] = [
  {
    id: '1',
    title: '2022 Honda City V MT',
    brand: 'Honda',
    model: 'City',
    year: 2022,
    price: 1150000,
    fuelType: 'petrol',
    transmission: 'manual',
    kmDriven: 12500,
    ownerType: '1st',
    location: 'Mumbai',
    color: 'Radiant Red',
    description: 'Immaculate condition Honda City. Single owner, rarely driven. Complete service history available.',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800',
    sellerId: 'admin',
    createdAt: new Date().toISOString(),
    status: 'available'
  },
  {
    id: '2',
    title: '2020 Hyundai Creta SX(O)',
    brand: 'Hyundai',
    model: 'Creta',
    year: 2020,
    price: 1575000,
    fuelType: 'diesel',
    transmission: 'automatic',
    kmDriven: 35000,
    ownerType: '1st',
    location: 'Bangalore',
    color: 'Polar White',
    description: 'Top-end Creta with panoramic sunroof. All original paint, new tires replaced last month.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
    sellerId: 'admin',
    createdAt: new Date().toISOString(),
    status: 'available'
  },
  {
    id: '3',
    title: '2019 Maruti Swift VXI',
    brand: 'Maruti Suzuki',
    model: 'Swift',
    year: 2019,
    price: 525000,
    fuelType: 'petrol',
    transmission: 'manual',
    kmDriven: 42000,
    ownerType: '2nd',
    location: 'Delhi',
    color: 'Magma Grey',
    description: 'Well maintained Swift. Good fuel efficiency and recently serviced. Insurance valid till 2025.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
    sellerId: 'admin',
    createdAt: new Date().toISOString(),
    status: 'available'
  }
];

export const itemService = {
  /**
   * Fetch all cars, optionally filtered
   */
  async getItems(filters?: CarFilters): Promise<Car[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let results = [...mockCars];

    if (filters?.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      results = results.filter((car) => 
        car.title.toLowerCase().includes(term) || 
        car.brand.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term)
      );
    }

    if (filters?.brand) {
      results = results.filter(car => car.brand === filters.brand);
    }

    if (filters?.minPrice) {
      results = results.filter(car => car.price >= filters.minPrice!);
    }

    if (filters?.maxPrice) {
      results = results.filter(car => car.price <= filters.maxPrice!);
    }

    return results;
  },

  /**
   * Fetch a single car by ID
   */
  async getItemById(id: string): Promise<Car | null> {
    return mockCars.find((car) => car.id === id) || null;
  },

  /**
   * Create a new car listing
   */
  async createItem(carData: Omit<Car, 'id' | 'createdAt' | 'status'>): Promise<Car> {
    const newCar: Car = {
      ...carData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'available'
    };
    mockCars.unshift(newCar);
    return newCar;
  },

  /**
   * Update an existing car
   */
  async updateItem(id: string, updates: Partial<Car>): Promise<Car> {
    const index = mockCars.findIndex((car) => car.id === id);
    if (index === -1) throw new Error('Car not found');

    const updated = { ...mockCars[index], ...updates };
    mockCars[index] = updated;
    return updated;
  },

  /**
   * Delete a car
   */
  async deleteItem(id: string): Promise<void> {
    mockCars = mockCars.filter((car) => car.id !== id);
  }
};
