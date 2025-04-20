import { FlatList, StyleSheet } from "react-native";
import { useTheme, MD3Theme } from "react-native-paper";

import { useGetOfflineObservations } from "@/store/selectors";
import { ObservationCard } from "./ObservationCard";

export const OfflineObservationList = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const observations = useGetOfflineObservations();

  return (
    <FlatList
      data={observations}
      renderItem={({ item }) => <ObservationCard observation={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    list: {
      padding: 16,
      gap: 8,
    },
  });
