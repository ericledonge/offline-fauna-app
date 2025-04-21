import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { useTheme, Card } from "react-native-paper";

import {
  useGetObservations,
  useClearObservations,
  useGetSyncedObservations,
  useGetUnsyncedObservations,
} from "@/store/selectors";
import { ObservationCard } from "./ObservationCard";
import { FilterButton } from "./FilterButton";
import { DeleteButton } from "./DeleteButton";

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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <FilterButton value={filter} onChange={setFilter} />
            <DeleteButton onPress={clearObservations} />
          </View>
        )}
        style={{
          padding: 16,
        }}
      />

      <Card.Content>
        <FlatList
          data={filteredObservations}
          renderItem={({ item }) => <ObservationCard observation={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 8, gap: 8 }}
        />
      </Card.Content>
    </Card>
  );
};
