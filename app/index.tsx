import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ObservationForm } from "@/components/ObservationForm";
import { ObservationList } from "@/components/ObservationList";
import { useTheme } from "@/hooks/useTheme";
import { useLoadFaunaData } from "@/hooks/useLoadFaunaData";
// import { useSyncObservations } from "@/hooks/useSyncObservations";

export default function ObservationsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  // Load fauna data
  useLoadFaunaData();

  // Enable automatic sync
  // useSyncObservations();

  return (
    <View style={styles.container}>
      <ObservationForm />
      <ObservationList />
    </View>
  );
}

const createStyles = (theme: any, insets: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    webLayout: {
      flex: 1,
      flexDirection: "row",
    },
    sidebar: {
      width: 300,
      borderRightWidth: 1,
      borderRightColor: theme.colors.outline,
      padding: 16,
    },
    mainContent: {
      flex: 1,
      padding: 16,
    },
    mobileLayout: {
      flex: 1,
      padding: 16,
    },
  });
