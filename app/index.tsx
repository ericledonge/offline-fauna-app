import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { OfflineObservationForm } from "@/components/OfflineObservationForm";
import { OfflineObservationList } from "@/components/OfflineObservationList";
import { useTheme } from "@/hooks/useTheme";

export default function ObservationsScreen() {
  const theme = useTheme();

  const insets = useSafeAreaInsets();

  const styles = createStyles(theme, insets);

  return (
    // <View style={styles.container}>
    //   {Platform.OS === "web" ? (
    //     <View style={styles.webLayout}>
    //       <View style={styles.sidebar}>
    //         <OfflineObservationForm />
    //       </View>
    //       <View style={styles.mainContent}>
    //         <OfflineObservationList />
    //       </View>
    //     </View>
    //   ) : (
    //     <View style={styles.mobileLayout}>
    //       <OfflineObservationForm />
    //       <OfflineObservationList />
    //     </View>
    //   )}
    // </View>
    <View style={styles.container}>
      <OfflineObservationForm />
      <OfflineObservationList />
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
