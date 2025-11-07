import { useRideStore } from "@/src/store/RideStore";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { lightTheme } from "../src/theme/colors";

export default function SplashScreen() {
  const fetchRides = useRideStore((s) => s.fetchRides);
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    fetchRides();

    const timeout = setTimeout(() => {
      router.replace("/home");
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.logo}>🌱</Text>
        <Text style={styles.title}>GreenRide</Text>
        <Text style={styles.subtitle}>Eco-Friendly Transportation</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { fontSize: 80, marginBottom: 16 },
  title: { fontSize: 36, fontWeight: "bold", color: "#FFF" },
  subtitle: { fontSize: 16, color: "#FFF", opacity: 0.9 },
});
