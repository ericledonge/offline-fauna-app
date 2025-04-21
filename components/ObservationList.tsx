import { useState } from "react";
import { FlatList, View } from "react-native";
import { useTheme, Card, IconButton, Menu } from "react-native-paper";
import { Trash, Funnel } from "lucide-react-native";

import {
  useGetObservations,
  useClearObservations,
  useGetSyncedObservations,
  useGetUnsyncedObservations,
} from "@/store/selectors";
import { ObservationCard } from "./ObservationCard";
import { SyncStatusIcon } from "./SyncStatusIcon";

export const ObservationList = () => {
  const theme = useTheme();
  const [filter, setFilter] = useState<"all" | "synced" | "unsynced">("all");
  const [visible, setVisible] = useState(false);

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
            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={
                <IconButton
                  icon={() => <Funnel size={20} />}
                  onPress={() => setVisible(true)}
                />
              }
            >
              <Menu.Item
                leadingIcon={() => <View style={{ width: 20, height: 20 }} />}
                onPress={() => {
                  setFilter("all");
                  setVisible(false);
                }}
                title="All"
              />
              <Menu.Item
                leadingIcon={() => <SyncStatusIcon isSynced={true} size={20} />}
                onPress={() => {
                  setFilter("synced");
                  setVisible(false);
                }}
                title="Synced"
              />
              <Menu.Item
                leadingIcon={() => (
                  <SyncStatusIcon isSynced={false} size={20} />
                )}
                onPress={() => {
                  setFilter("unsynced");
                  setVisible(false);
                }}
                title="Unsynced"
              />
            </Menu>
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
