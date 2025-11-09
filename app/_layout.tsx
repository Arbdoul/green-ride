import { useRideStore } from "@/src/store/RideStore";
import { darkTheme, lightTheme } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons"; // or any icon library
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const isDarkMode = useRideStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />

        <Stack.Screen
          name="confirm"
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerShadowVisible: false,
            title: "Confirm Ride",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} style={{}}>
                <Ionicons name="chevron-back" size={28} color={theme.text} />
              </TouchableOpacity>
            ),
          }}
        />

        {/* Profile screen with custom back button */}
        <Stack.Screen
          name="profile"
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerLeft: ({}) => (
              <TouchableOpacity onPress={() => router.back()} style={{}}>
                <Ionicons name="chevron-back" size={28} color={theme.text} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
