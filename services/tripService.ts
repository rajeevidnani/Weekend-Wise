import { Trip, FilterState } from '../types';

// Mock Data Generator
const DESTINATIONS = [
  { city: 'Palma de Mallorca', country: 'Spain', air: 26, water: 22, img: 'https://picsum.photos/id/10/800/600' },
  { city: 'Santorini', country: 'Greece', air: 24, water: 21, img: 'https://picsum.photos/id/1050/800/600' },
  { city: 'Faro', country: 'Portugal', air: 25, water: 20, img: 'https://picsum.photos/id/1029/800/600' },
  { city: 'Nice', country: 'France', air: 23, water: 19, img: 'https://picsum.photos/id/1047/800/600' },
  { city: 'Dubrovnik', country: 'Croatia', air: 25, water: 21, img: 'https://picsum.photos/id/1018/800/600' },
  { city: 'Malta', country: 'Malta', air: 27, water: 23, img: 'https://picsum.photos/id/1039/800/600' },
  { city: 'Tenerife', country: 'Spain', air: 28, water: 24, img: 'https://picsum.photos/id/1041/800/600' },
  { city: 'Antalya', country: 'Turkey', air: 29, water: 25, img: 'https://picsum.photos/id/1027/800/600' },
];

const HOTELS = ['Grand Azure', 'Sunset Royal', 'Oceanic Prime', 'Vista Mar', 'The Haven'];

// Helper to calculate the "Vacation Efficiency Score"
// Heuristic:
// - Start at 70
// - High Water Temp: +2 per degree over 20
// - Low PTO: +15 for 0 days, +10 for 0.5 days, +0 for 1 day, -10 for >1
// - Price: +10 if under 300, -1 per 10 over 400
// - Stars: +5 for 5 stars
const calculateEfficiencyScore = (trip: Partial<Trip>): number => {
  let score = 70;

  // Temp Bonus
  if (trip.waterTemp && trip.waterTemp >= 20) {
    score += (trip.waterTemp - 20) * 3;
  }

  // PTO Bonus
  if (trip.ptoDaysRequired === 0) score += 20;
  else if (trip.ptoDaysRequired === 0.5) score += 12;
  else if ((trip.ptoDaysRequired || 0) > 1) score -= 10;

  // Price Logic
  const price = trip.pricePerPerson || 350;
  if (price < 300) score += 15;
  else if (price > 450) score -= ((price - 450) / 10);

  // Stars
  if (trip.hotelStars === 5) score += 8;

  return Math.min(100, Math.max(0, Math.round(score)));
};

export const generateMockTrips = (): Trip[] => {
  return Array.from({ length: 24 }).map((_, i) => {
    const dest = DESTINATIONS[i % DESTINATIONS.length];
    const isWeekend = i % 3 === 0; // Prioritize weekends
    
    // Simulate smart flight times
    const departureHour = 11 + Math.floor(Math.random() * 5); // 11:00 - 15:00 preference
    const returnHour = 16 + Math.floor(Math.random() * 6);
    
    const duration = 3 + Math.floor(Math.random() * 2); // 3-4 nights
    
    // PTO Calculation
    // Fri 14:00 dep = 0.5 days. Fri 18:00 = 0 days. Thu = 1.5+ days.
    let pto = 1;
    if (isWeekend) {
       pto = departureHour >= 17 ? 0 : departureHour >= 12 ? 0.5 : 1;
    } else {
       pto = duration; // Weekday trip uses full days
    }

    const hotelStars = Math.random() > 0.4 ? 5 : 4;
    const baseFlight = 80 + Math.floor(Math.random() * 100);
    const baseHotel = (90 + Math.floor(Math.random() * 80)) * duration;
    const totalPrice = baseFlight + (baseHotel / 2); // Per person (sharing room)

    const trip: Trip = {
      id: `trip-${i}`,
      destination: dest.city,
      country: dest.country,
      imageUrl: dest.img,
      departureTime: isWeekend ? `Fri ${departureHour}:30` : `Wed ${departureHour}:15`,
      returnTime: isWeekend ? `Mon ${returnHour}:00` : `Sat ${returnHour}:45`,
      durationNights: duration,
      hotelName: HOTELS[i % HOTELS.length],
      hotelStars: hotelStars as 4 | 5,
      pricePerPerson: Math.round(totalPrice),
      totalPrice: Math.round(totalPrice * 2), // Total package for 2
      flightPrice: baseFlight,
      hotelPricePerNight: Math.round(baseHotel / duration),
      airTemp: dest.air + (Math.random() * 2 - 1), // slight variance
      waterTemp: dest.water,
      ptoDaysRequired: pto,
      tags: [],
      efficiencyScore: 0, // calc below
    };

    trip.efficiencyScore = calculateEfficiencyScore(trip);

    // Add dynamic tags based on data
    if (trip.waterTemp >= 23) trip.tags.push("Warmest Water");
    if (trip.efficiencyScore > 90) trip.tags.push("Top Pick");
    if (trip.pricePerPerson < 300) trip.tags.push("Best Value");

    return trip;
  });
};

export const filterTrips = (trips: Trip[], filters: FilterState): Trip[] => {
  // Simulating "Ask for departure airport"
  if (!filters.departureAirport || filters.departureAirport.trim() === '') {
    return [];
  }

  return trips.filter(t => {
    if (t.pricePerPerson > filters.maxPrice) return false;
    if (t.waterTemp < filters.minWaterTemp) return false;
    if (t.hotelStars < filters.minStars) return false;
    if (filters.maximizeLongWeekends && !t.departureTime.startsWith("Fri")) return false;
    if (t.ptoDaysRequired > filters.maxPto) return false;
    return true;
  });
};