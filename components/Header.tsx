import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Image, View } from "react-native";
import { Trash } from "lucide-react-native";

import { useTheme } from "@/hooks/useTheme";
import { Connection } from "./Connection";
import { useClearObservations } from "@/store/selectors";

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "" }) => {
  const { colors } = useTheme();

  const clearObservations = useClearObservations();

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: colors.primary }]}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo-fyri.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Appbar.Content title={title} />
      <Appbar.Action
        icon={() => <Trash color="red" />}
        onPress={clearObservations}
      />
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
