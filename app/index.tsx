import React from "react";
import { View } from "react-native";

import { ObservationForm } from "@/components/ObservationForm";
import { ObservationList } from "@/components/ObservationList";
import { useTheme } from "@/hooks/useTheme";
import { useLoadFaunaData } from "@/hooks/useLoadFaunaData";
import { useSyncObservations } from "@/hooks/useSyncObservations";

export default function ObservationsScreen() {
  const theme = useTheme();

  // Load fauna data
  useLoadFaunaData();

  // Enable automatic sync
  useSyncObservations();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        gap: 16,
        padding: 16,
      }}
    >
      <ObservationForm />
      <ObservationList />
    </View>
  );
}
