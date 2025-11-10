import { CustomButton } from "@/src/components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRideStore } from "../src/store/RideStore";
import { darkTheme, lightTheme } from "../src/theme/colors";

export default function ConfirmScreen() {
  const navigation = useRouter();
  const { currentBooking, confirmBooking, isDarkMode } = useRideStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    if (!currentBooking) {
      router.replace("/home");
    }
  }, [currentBooking]);

  if (!currentBooking) {
    return null;
  }

  const handleConfirm = () => {
    confirmBooking();
    Alert.alert(
      "Ride Confirmed!",
      `You've earned ${Math.floor(
        currentBooking.co2Saved * 10
      )} EcoPoints and saved ${currentBooking.co2Saved.toFixed(1)} kg of CO₂!`,
      [
        {
          text: "View Profile",
          onPress: () => navigation.push("/profile"),
        },
        {
          text: "Book Another",
          onPress: () => navigation.push("/home"),
        },
      ]
    );
  };

  const vehicleColor =
    currentBooking.vehicleType === "Electric" ? theme.electric : theme.hybrid;

  return (
    <SafeAreaProvider
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        {/* Success Icon */}
        <Ionicons
          name="checkmark-circle"
          size={80}
          color={theme.success}
          style={styles.icon}
        />

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

          {/* Environmental Impact Section */}
          <View style={styles.ecoSection}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                paddingBottom: 8,
              }}
            >
              <Ionicons name="earth" size={20} color={theme.success} />
              <Text style={[styles.ecoTitle, { color: theme.success }]}>
                Environmental Impact
              </Text>
            </View>

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
          <CustomButton title="Confirm Booking" onPress={handleConfirm} />
          <CustomButton
            title="Cancel"
            onPress={() => navigation.back()}
            variant="secondary"
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    //flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
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
    // marginBottom: 12,
  },
  ecoValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    gap: 12,
  },
});
