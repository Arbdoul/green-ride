import { useRideStore } from "@/src/store/RideStore";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { RideCard } from "../src/components/RideCard";
import { darkTheme, lightTheme } from "../src/theme/colors";
import { Ride } from "../src/types";

export default function HomeScreen() {
  const { rides, bookRide, isDarkMode } = useRideStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const inset = useSafeAreaInsets();
  const router = useRouter();

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const destination = {
    latitude: 37.7949,
    longitude: -122.4194,
  };

  const mapStyle = useMemo(
    () => (isDarkMode ? darkMapStyle : []),
    [isDarkMode]
  );

  useEffect(() => {
    (async () => {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        setLoading(false);
        return;
      }

      // Get the user's current position
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  const handleBookRide = (ride: Ride) => {
    bookRide(ride);
    router.push("/confirm");
  };

  if (loading || !userLocation) {
    return (
      <SafeAreaProvider
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ color: theme.text, marginTop: 10 }}>
          Fetching your location...
        </Text>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider
      style={[
        styles.container,
        { backgroundColor: theme.background, paddingTop: inset.top },
      ]}
    >
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        translucent
        backgroundColor="transparent"
      />

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
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          style={styles.map}
          initialRegion={{
            ...userLocation,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          customMapStyle={mapStyle}
          showsUserLocation={true}
          followsUserLocation={true}
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
    </SafeAreaProvider>
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
});
