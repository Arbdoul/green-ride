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
      icon: "🚗",
    },
    {
      label: "CO₂ Saved",
      value: `${userProfile.totalCO2Saved.toFixed(1)} kg`,
      icon: "🌱",
    },
    {
      label: "EcoPoints",
      value: userProfile.ecoPoints.toString(),
      icon: "⭐",
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
          <Text style={styles.icon}>{stat.icon}</Text>
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
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    textAlign: "center",
  },
});
