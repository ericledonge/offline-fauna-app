import React, { useState } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import { Menu, Portal, useTheme } from "react-native-paper";
import { Funnel } from "lucide-react-native";

import { SyncStatusIcon } from "./SyncStatusIcon";

type FilterType = "all" | "synced" | "unsynced";

interface FilterButtonProps {
  value: FilterType;
  onChange: (value: FilterType) => void;
}

export const FilterButton = ({ value, onChange }: FilterButtonProps) => {
  const theme = useTheme();

  const [visible, setVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  const handlePress = (event: any) => {
    const { nativeEvent } = event;
    setMenuAnchor({
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    });
    setVisible(true);
  };

  const menu = (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={menuAnchor}
    >
      <Menu.Item
        leadingIcon={() => <View style={{ width: 20, height: 20 }} />}
        onPress={() => {
          onChange("all");
          setVisible(false);
        }}
        title="All"
      />
      <Menu.Item
        leadingIcon={() => <SyncStatusIcon isSynced={true} size={20} />}
        onPress={() => {
          onChange("synced");
          setVisible(false);
        }}
        title="Synced"
      />
      <Menu.Item
        leadingIcon={() => <SyncStatusIcon isSynced={false} size={20} />}
        onPress={() => {
          onChange("unsynced");
          setVisible(false);
        }}
        title="Unsynced"
      />
    </Menu>
  );

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.surface,
          borderRadius: 20,
        }}
      >
        <Funnel size={20} color={theme.colors.primary} />
      </TouchableOpacity>
      {Platform.OS === "web" ? menu : <Portal>{menu}</Portal>}
    </>
  );
};
