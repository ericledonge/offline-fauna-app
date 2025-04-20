import { View, StyleSheet, FlatList, Platform } from "react-native";
import { Text, useTheme, Card, IconButton, MD3Theme } from "react-native-paper";

import { OfflineObservation } from "@/models/offline-observation.model";
import { useGetOfflineObservations } from "@/store/selectors";

export const OfflineObservationList = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const observations = useGetOfflineObservations();

  const renderItem = ({ item }: { item: OfflineObservation }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text variant="bodyMedium" style={styles.description}>
            {item.description}
          </Text>
          {!item.synced && (
            <IconButton
              icon="sync"
              size={20}
              iconColor={theme.colors.primary}
              onPress={() => {}}
            />
          )}
        </View>

        <Text variant="bodySmall" style={styles.date}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={observations}
      renderItem={renderItem}
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
    card: {
      marginBottom: 8,
      ...Platform.select({
        ios: {
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      }),
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
    },
    description: {
      marginBottom: 8,
      color: theme.colors.onSurfaceVariant,
    },
    date: {
      color: theme.colors.onSurfaceVariant,
      textAlign: "right",
    },
  });
