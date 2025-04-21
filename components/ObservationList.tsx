import { FlatList, StyleSheet } from "react-native";
import { useTheme, MD3Theme, Card } from "react-native-paper";

import { useGetObservations } from "@/store/selectors";
import { ObservationCard } from "./ObservationCard";

export const ObservationList = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const observations = useGetObservations();

  return (
    <Card style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <Card.Title title="Observations" />

      <Card.Content>
        <FlatList
          data={observations}
          renderItem={({ item }) => <ObservationCard observation={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </Card.Content>
    </Card>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    list: {
      padding: 16,
      gap: 8,
    },
  });
