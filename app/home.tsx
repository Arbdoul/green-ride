import React from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { RideCard } from "../src/components/RideCard";
import { lightTheme, darkTheme } from "../src/theme/colors";
import { useRouter } from "expo-router";
import { Ride } from "../src/types";
import { useRideStore } from "@/src/store/RideStore";

export default function HomeScreen() {
  const { rides, bookRide, isDarkMode } = useRideStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const router = useRouter();

  const handleBookRide = (ride: Ride) => {
    bookRide(ride);
    router.push("/confirm");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: theme.text }]}>Available Rides</Text>
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RideCard ride={item} onPress={() => handleBookRide(item)} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
});
