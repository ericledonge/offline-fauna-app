import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function Page() {
  return (
    <View style={styles.container}>
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
