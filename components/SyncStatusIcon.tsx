import { useTheme } from "react-native-paper";
import { RefreshCw, RefreshCwOff } from "lucide-react-native";

interface SyncStatusIconProps {
  isSynced: boolean;
  size?: number;
}

export const SyncStatusIcon = ({
  isSynced,
  size = 20,
}: SyncStatusIconProps) => {
  const theme = useTheme();

  return !isSynced ? (
    <RefreshCwOff size={size} color={theme.colors.primary} />
  ) : (
    <RefreshCw size={size} color={theme.colors.primary} />
  );
};
