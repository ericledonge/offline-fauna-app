import { FlatList } from "react-native";
import { useTheme, Card } from "react-native-paper";

import { useGetObservations } from "@/store/selectors";
import { ObservationCard } from "./ObservationCard";

export const ObservationList = () => {
  const theme = useTheme();

  const observations = useGetObservations();

  return (
    <Card style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <Card.Title title="Observations" titleVariant="titleMedium" />

      <Card.Content>
        <FlatList
          data={observations}
          renderItem={({ item }) => <ObservationCard observation={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 8 }}
        />
      </Card.Content>
    </Card>
  );
};
