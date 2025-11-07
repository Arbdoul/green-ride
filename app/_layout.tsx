import { Stack } from "expo-router";
import "react-native-reanimated";

import { useRideStore } from "@/src/store/RideStore";
import { darkTheme, lightTheme } from "@/src/theme/colors";

export default function RootLayout() {
  const isDarkMode = useRideStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="confirm" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}
