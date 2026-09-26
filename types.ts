export interface Trip {
  id: string;
  destination: string;
  country: string;
  imageUrl: string;
  departureTime: string; // e.g., "Fri 14:30"
  returnTime: string;    // e.g., "Mon 11:00"
  durationNights: number;
  hotelName: string;
  hotelStars: 4 | 5;
  pricePerPerson: number;
  totalPrice: number; // usually pricePerPerson * 2 for couple
  airTemp: number;
  waterTemp: number;
  ptoDaysRequired: number; // 0, 0.5, 1, etc.
  tags: string[]; // e.g., "Best Value", "Warmest Water"
  flightPrice: number;
  hotelPricePerNight: number;
  efficiencyScore: number; // 0-100 calculated
}

export interface FilterState {
  maxPrice: number;
  minWaterTemp: number;
  minStars: 4 | 5;
  maximizeLongWeekends: boolean;
  maxPto: number;
  departureAirport: string;
}

export enum SortOption {
  EFFICIENCY = 'Efficiency Score',
  PRICE_LOW = 'Price: Low to High',
  TEMP_HIGH = 'Temperature: High to Low',
}