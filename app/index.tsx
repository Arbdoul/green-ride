import { useRideStore } from "@/src/store/RideStore";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { lightTheme } from "../src/theme/colors";

export default function SplashScreen() {
  const fetchRides = useRideStore((s) => s.fetchRides);
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    fetchRides();

    const timeout = setTimeout(() => {
      router.replace("/home");
    }, 2200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image
          source={require("../assets/images/logo.png")} // 👈 your eco logo
          style={styles.logo}
          resizeMode="contain"
        />
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
  content: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
});
