import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import { useTheme } from "@/hooks/useTheme";

export default function Page() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Button
        mode="contained"
        onPress={() => console.log("Pressed")}
        style={styles.button}
      >
        Press me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 16,
  },
});
