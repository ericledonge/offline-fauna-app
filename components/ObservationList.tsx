import { FlatList } from "react-native";
import { useTheme, Card, IconButton } from "react-native-paper";
import { Trash } from "lucide-react-native";

import { useGetObservations, useClearObservations } from "@/store/selectors";
import { ObservationCard } from "./ObservationCard";

export const ObservationList = () => {
  const theme = useTheme();

  const observations = useGetObservations();

  const clearObservations = useClearObservations();

  return (
    <Card style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <Card.Title
        title="Observations"
        titleVariant="titleMedium"
        right={() => (
          <IconButton
            icon={() => <Trash color="red" size={20} />}
            onPress={clearObservations}
          />
        )}
      />

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
