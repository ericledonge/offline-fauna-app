import React from "react";
import { View, Text } from "react-native";

import { useTheme } from "@/hooks/useTheme";

export function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <View
      style={{
        padding: 16,
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={{ color: theme.colors.onSurface }}>
        © {currentYear} Fyri tout droits reserves
      </Text>
    </View>
  );
}
