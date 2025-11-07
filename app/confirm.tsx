import React from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { darkTheme, lightTheme } from "../src/theme/colors";

import { Button } from "@/src/components/button";
import { useRideStore } from "@/src/store/RideStore";
import { useRouter } from "expo-router";

export default function ConfirmScreen() {
  const navigation = useRouter();
  const { currentBooking, confirmBooking, isDarkMode } = useRideStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  if (!currentBooking) {
    navigation.replace("/home");
    return null;
  }

  const handleConfirm = () => {
    confirmBooking();
    Alert.alert(
      "Ride Confirmed! 🎉",
      `You've earned ${Math.floor(
        currentBooking.co2Saved * 10
      )} EcoPoints and saved ${currentBooking.co2Saved.toFixed(1)} kg of CO₂!`,
      [
        {
          text: "View Profile",
          onPress: () => navigation.navigate("/profile"),
        },
        {
          text: "Book Another",
          onPress: () => navigation.navigate("/home"),
        },
      ]
    );
  };

  const vehicleColor =
    currentBooking.vehicleType === "Electric" ? theme.electric : theme.hybrid;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>✅</Text>
        <Text style={[styles.title, { color: theme.text }]}>
          Confirm Your Ride
        </Text>

        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Vehicle Type
            </Text>
            <View style={[styles.badge, { backgroundColor: vehicleColor }]}>
              <Text style={styles.badgeText}>{currentBooking.vehicleType}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Estimated Arrival
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>
              {currentBooking.eta}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Price
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>
              ${currentBooking.price.toFixed(2)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.ecoSection}>
            <Text style={[styles.ecoTitle, { color: theme.success }]}>
              Environmental Impact 🌍
            </Text>
            <View style={styles.row}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>
                CO₂ Saved
              </Text>
              <Text style={[styles.ecoValue, { color: theme.success }]}>
                {currentBooking.co2Saved.toFixed(1)} kg
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>
                EcoPoints Earned
              </Text>
              <Text style={[styles.ecoValue, { color: theme.success }]}>
                +{Math.floor(currentBooking.co2Saved * 10)} points
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Confirm Booking" onPress={handleConfirm} />
          <Button
            title="Cancel"
            onPress={() => navigation.back()}
            variant="secondary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  icon: {
    fontSize: 64,
    textAlign: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  ecoSection: {
    marginTop: 8,
  },
  ecoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  ecoValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    gap: 12,
  },
});
