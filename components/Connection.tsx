import React from "react";
import { Wifi, WifiOff } from "lucide-react-native";

import { useTheme } from "@/hooks/useTheme";
import { useNetworkStatus } from "@/hooks/use-network-status";

export const Connection: React.FC = () => {
  const { colors } = useTheme();

  const isConnected = useNetworkStatus();

  return isConnected ? (
    <Wifi color={colors.onPrimary} size={24} />
  ) : (
    <WifiOff color={colors.onPrimary} size={24} />
  );
};
