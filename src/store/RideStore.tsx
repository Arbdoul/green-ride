import { create } from "zustand";
import ridesData from "../data/rides.json";
import { BookedRide, Ride, UserProfile } from "../types";

interface RideStore {
  rides: Ride[];
  currentBooking: BookedRide | null;
  userProfile: UserProfile;
  isDarkMode: boolean;
  fetchRides: () => void;
  bookRide: (ride: Ride) => void;
  confirmBooking: () => void;
  toggleTheme: () => void;
}

export const useRideStore = create<RideStore>((set, get) => ({
  rides: [],
  currentBooking: null,
  userProfile: {
    totalRides: 0,
    totalCO2Saved: 0,
    ecoPoints: 0,
  },
  isDarkMode: false,

  fetchRides: () => {
    set({ rides: ridesData as Ride[] });
  },

  bookRide: (ride: Ride) => {
    const bookedRide: BookedRide = {
      ...ride,
      bookingTime: new Date().toISOString(),
    };
    set({ currentBooking: bookedRide });
  },

  confirmBooking: () => {
    const { currentBooking, userProfile } = get();
    if (currentBooking) {
      set({
        userProfile: {
          totalRides: userProfile.totalRides + 1,
          totalCO2Saved: userProfile.totalCO2Saved + currentBooking.co2Saved,
          ecoPoints:
            userProfile.ecoPoints + Math.floor(currentBooking.co2Saved * 10),
        },
        currentBooking: null,
      });
    }
  },

  toggleTheme: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
  },
}));
