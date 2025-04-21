import React, { useState } from "react";
import { View } from "react-native";
import { Menu, Button } from "react-native-paper";

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

  const [visible, setVisible] = useState(false);

  const selectedFauna = faunaList.find((fauna) => fauna.id === selectedFaunaId);

  return (
    <View style={{}}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button mode="outlined" onPress={() => setVisible(true)} style={{}}>
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
