import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRideStore } from "../store/RideStore";
import { darkTheme, lightTheme } from "../theme/colors";

export const EcoStats: React.FC = () => {
  const { userProfile, isDarkMode } = useRideStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const stats = [
    {
      label: "Total Rides",
      value: userProfile.totalRides.toString(),
      icon: "car-outline",
      color: theme.primary,
    },
    {
      label: "CO₂ Saved",
      value: `${userProfile.totalCO2Saved.toFixed(1)} kg`,
      icon: "leaf-outline",
      color: theme.success,
    },
    {
      label: "EcoPoints",
      value: userProfile.ecoPoints.toString(),
      icon: "star-outline",
      color: "#facc15",
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View
          key={index}
          style={[styles.statCard, { backgroundColor: theme.surface }]}
          accessibilityLabel={`${stat.label}: ${stat.value}`}
        >
          <Ionicons name={stat.icon as any} size={28} color={stat.color} />
          <Text style={[styles.value, { color: theme.text }]}>
            {stat.value}
          </Text>
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 6,
  },
  label: {
    fontSize: 12,
    textAlign: "center",
  },
});
