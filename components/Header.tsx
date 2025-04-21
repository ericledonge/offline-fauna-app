import React from "react";
import { Appbar } from "react-native-paper";
import { Image, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { Connection } from "./Connection";

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "" }) => {
  const { colors } = useTheme();

  return (
    <Appbar.Header style={{ elevation: 0, backgroundColor: colors.primary }}>
      <View style={{ width: 60, height: 60, marginLeft: 8 }}>
        <Image
          source={require("../assets/images/logo-fyri.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>
      <Appbar.Content title={title} />
      <Connection />
    </Appbar.Header>
  );
};
