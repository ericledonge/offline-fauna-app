import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Image, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { Connection } from "./Connection";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = "",
  showBackButton = false,
  onBackPress,
}) => {
  const { colors } = useTheme();

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: colors.primary }]}>
      {showBackButton && <Appbar.BackAction onPress={onBackPress} />}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo-fyri.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Appbar.Content title={title} />
      <Connection />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 0,
  },
  logoContainer: {
    width: 60,
    height: 60,
    marginLeft: 8,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});
