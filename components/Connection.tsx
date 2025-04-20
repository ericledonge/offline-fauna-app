import React from "react";
import { Wifi, WifiOff } from "lucide-react-native";
import { useNetworkState } from "expo-network";

import { useTheme } from "@/hooks/useTheme";

export const Connection: React.FC = () => {
  const { colors } = useTheme();

  const isConnected = useNetworkState();

  return isConnected ? (
    <Wifi color={colors.onPrimary} size={24} />
  ) : (
    <WifiOff color={colors.onPrimary} size={24} />
  );
};
