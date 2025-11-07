import { EcoStats } from "@/src/components/EcoStat";
import { useRideStore } from "@/src/store/RideStore";
import { darkTheme, lightTheme } from "@/src/theme/colors";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export const ProfileScreen: React.FC = () => {
  const { userProfile, isDarkMode, toggleTheme } = useRideStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.avatar}>👤</Text>
          <Text style={[styles.name, { color: theme.text }]}>Eco Warrior</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            GreenRide Member
          </Text>
        </View>

        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Your Impact
          </Text>
          <EcoStats />
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Achievements 🏆
          </Text>
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>🌱</Text>
            <View style={styles.achievementText}>
              <Text style={[styles.achievementTitle, { color: theme.text }]}>
                Eco Beginner
              </Text>
              <Text
                style={[styles.achievementDesc, { color: theme.textSecondary }]}
              >
                Complete your first eco-friendly ride
              </Text>
            </View>
          </View>

          {userProfile.totalRides >= 5 && (
            <View style={styles.achievement}>
              <Text style={styles.achievementIcon}>⭐</Text>
              <View style={styles.achievementText}>
                <Text style={[styles.achievementTitle, { color: theme.text }]}>
                  Green Champion
                </Text>
                <Text
                  style={[
                    styles.achievementDesc,
                    { color: theme.textSecondary },
                  ]}
                >
                  Complete 5 eco-friendly rides
                </Text>
              </View>
            </View>
          )}

          {userProfile.totalCO2Saved >= 10 && (
            <View style={styles.achievement}>
              <Text style={styles.achievementIcon}>🌍</Text>
              <View style={styles.achievementText}>
                <Text style={[styles.achievementTitle, { color: theme.text }]}>
                  Planet Saver
                </Text>
                <Text
                  style={[
                    styles.achievementDesc,
                    { color: theme.textSecondary },
                  ]}
                >
                  Save 10kg of CO₂ emissions
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={styles.settingRow}>
            <View>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                Dark Mode
              </Text>
              <Text
                style={[styles.settingDesc, { color: theme.textSecondary }]}
              >
                {isDarkMode ? "Enabled" : "Disabled"}
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: theme.primary }}
              thumbColor="#FFFFFF"
              accessibilityLabel="Toggle dark mode"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    fontSize: 64,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  statsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 14,
  },
});
