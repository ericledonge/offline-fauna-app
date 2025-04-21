import React from "react";
import { IconButton, useTheme } from "react-native-paper";
import { Trash } from "lucide-react-native";

interface DeleteButtonProps {
  onPress: () => void;
}

export const DeleteButton = ({ onPress }: DeleteButtonProps) => {
  const theme = useTheme();

  return (
    <IconButton
      icon={() => <Trash color="red" size={20} />}
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.errorContainer,
        borderRadius: 20,
      }}
    />
  );
};
