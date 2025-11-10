import { useRideStore } from "@/src/store/RideStore";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

  // ✅ Default location (fallback)
  const DEFAULT_LOCATION = {
    latitude: 37.78825,
    longitude: -122.4324,
  };

  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);

  const destination = {
    latitude: 37.7949,
    longitude: -122.4194,
  };

  const mapStyle = useMemo(
    () => (isDarkMode ? darkMapStyle : []),
    [isDarkMode]
  );

  useEffect(() => {
    let isMounted = true;

    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.log("⚠️ Location permission denied");
          if (isMounted) {
            setLocationError(true);
            setLoading(false);
            Alert.alert(
              "Location Access",
              "Location permission is required to show nearby rides. Using default location.",
              [{ text: "OK" }]
            );
          }
          return;
        }

        console.log("✅ Permission granted, fetching location...");

        // ✅ Get current location with timeout
        const locationPromise = Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced, // Changed from High to Balanced
          timeInterval: 5000,
          distanceInterval: 10,
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Location timeout")), 10000)
        );

        const location = (await Promise.race([
          locationPromise,
          timeoutPromise,
        ])) as Location.LocationObject;

        if (isMounted && location) {
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setLocationError(false);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        if (isMounted) {
          setLocationError(true);
          // Use default location on error
          Alert.alert(
            "Location Error",
            "Unable to get your location. Using default location.",
            [{ text: "OK" }]
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleBookRide = (ride: Ride) => {
    bookRide(ride);
    router.push("/confirm");
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ color: theme.text, marginTop: 10 }}>
          Loading rides...
        </Text>
      </View>
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
          {locationError
            ? "Showing default location"
            : "Choose your eco-friendly ride"}
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
          showsUserLocation={!locationError}
          followsUserLocation={!locationError}
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
        contentContainerStyle={{ paddingBottom: 35 }}
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
