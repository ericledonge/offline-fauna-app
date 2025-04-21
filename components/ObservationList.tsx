import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { useTheme, Card, IconButton } from "react-native-paper";
import { Trash } from "lucide-react-native";

import {
  useGetObservations,
  useClearObservations,
  useGetSyncedObservations,
  useGetUnsyncedObservations,
} from "@/store/selectors";
import { ObservationCard } from "./ObservationCard";
import { FilterButton } from "./FilterButton";

export const ObservationList = () => {
  const theme = useTheme();

  const [filter, setFilter] = useState<"all" | "synced" | "unsynced">("all");

  const observations = useGetObservations();
  const getSyncedObservations = useGetSyncedObservations();
  const getUnsyncedObservations = useGetUnsyncedObservations();
  const clearObservations = useClearObservations();

  const filteredObservations =
    filter === "all"
      ? observations
      : filter === "synced"
      ? getSyncedObservations()
      : getUnsyncedObservations();

  return (
    <Card style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <Card.Title
        title="Observations"
        titleVariant="titleMedium"
        right={() => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FilterButton value={filter} onChange={setFilter} />
            <IconButton
              icon={() => <Trash color="red" size={20} />}
              onPress={clearObservations}
            />
          </View>
        )}
      />

      <Card.Content>
        <FlatList
          data={filteredObservations}
          renderItem={({ item }) => <ObservationCard observation={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 8 }}
        />
      </Card.Content>
    </Card>
  );
};
