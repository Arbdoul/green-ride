import { useRideStore } from "@/src/store/RideStore";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { RideCard } from "../src/components/RideCard";
import { darkTheme, lightTheme } from "../src/theme/colors";
import { Ride } from "../src/types";

export default function HomeScreen() {
  const { rides, bookRide, isDarkMode } = useRideStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const router = useRouter();

  const userLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };

  const destination = {
    latitude: 37.7949,
    longitude: -122.4194,
  };

  const mapStyle = useMemo(
    () => (isDarkMode ? darkMapStyle : []),
    [isDarkMode]
  );

  const handleBookRide = (ride: Ride) => {
    bookRide(ride);
    router.push("/confirm");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* <Text style={[styles.title, { color: theme.text }]}>Available Rides</Text> */}

      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Available Rides
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Choose your eco-friendly ride
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            ...userLocation,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          customMapStyle={mapStyle}
        >
          <Marker
            coordinate={userLocation}
            title="Your Location"
            pinColor={theme.primary}
          />
          <Marker
            coordinate={destination}
            title="Destination"
            pinColor={theme.secondary}
          />
        </MapView>
      </View>

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

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  mapContainer: {
    height: 200,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
  ridesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});
