export interface Ride {
  id: number;
  vehicleType: "Electric" | "Hybrid";
  eta: string;
  price: number;
  co2Saved: number;
}

export interface UserProfile {
  totalRides: number;
  totalCO2Saved: number;
  ecoPoints: number;
}

export interface BookedRide extends Ride {
  bookingTime: string;
}
