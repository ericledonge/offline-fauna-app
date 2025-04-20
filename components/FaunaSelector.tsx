import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, MD3Theme, Menu, Button } from "react-native-paper";

import { Fauna } from "@/models/fauna.model";
import { useTheme } from "@/hooks/useTheme";

interface FaunaSelectorProps {
  selectedFaunaId: string | null;
  onSelectFauna: (faunaId: string) => void;
  faunaList: Fauna[];
}

export const FaunaSelector = ({
  selectedFaunaId,
  onSelectFauna,
  faunaList,
}: FaunaSelectorProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [visible, setVisible] = useState(false);

  const selectedFauna = faunaList.find((fauna) => fauna.id === selectedFaunaId);

  return (
    <View style={styles.container}>
      <Text variant="labelMedium" style={styles.label}>
        Espèce observée
      </Text>

      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setVisible(true)}
            style={styles.button}
          >
            {selectedFauna
              ? `${selectedFauna.icon} ${selectedFauna.name}`
              : "Sélectionnez une espèce"}
          </Button>
        }
      >
        {faunaList.map((fauna) => (
          <Menu.Item
            key={fauna.id}
            onPress={() => {
              onSelectFauna(fauna.id);
              setVisible(false);
            }}
            title={`${fauna.icon} ${fauna.name}`}
          />
        ))}
      </Menu>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      marginBottom: 4,
      color: theme.colors.onSurfaceVariant,
    },
    button: {
      backgroundColor: theme.colors.surfaceVariant,
    },
  });
