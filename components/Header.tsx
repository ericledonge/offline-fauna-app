import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Image, View } from "react-native";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo-fyri.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    backgroundColor: "#1B4D3E",
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
