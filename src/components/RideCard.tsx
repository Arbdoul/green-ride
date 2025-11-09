import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRideStore } from "../store/RideStore";
import { darkTheme, lightTheme } from "../theme/colors";
import { Ride } from "../types";

interface RideCardProps {
  ride: Ride;
  onPress: () => void;
}

export const RideCard: React.FC<RideCardProps> = ({ ride, onPress }) => {
  const isDarkMode = useRideStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const vehicleColor =
    ride.vehicleType === "Electric" ? theme.electric : theme.hybrid;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.surface }]}
      onPress={onPress}
      accessibilityLabel={`Book ${ride.vehicleType} ride for $${ride.price}`}
      accessibilityRole="button"
    >
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: vehicleColor }]}>
          <Text style={styles.badgeText}>{ride.vehicleType}</Text>
        </View>
        <Text style={[styles.eta, { color: theme.textSecondary }]}>
          ETA: {ride.eta}
        </Text>
      </View>

      <View style={styles.details}>
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: theme.text }]}>
            N{ride.price.toFixed(2)}
          </Text>
        </View>

        <View style={styles.ecoContainer}>
          <Text style={[styles.ecoLabel, { color: theme.textSecondary }]}>
            CO₂ Saved
          </Text>
          <Text style={[styles.ecoValue, { color: theme.success }]}>
            {ride.co2Saved.toFixed(1)} kg
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  eta: {
    fontSize: 14,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ecoContainer: {
    alignItems: "flex-end",
  },
  ecoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  ecoValue: {
    fontSize: 16,
    fontWeight: "600",
  },
});
