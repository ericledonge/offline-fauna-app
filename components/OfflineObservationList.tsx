import { View, StyleSheet, FlatList, Platform } from "react-native";
import { Text, useTheme, Card, IconButton } from "react-native-paper";

// Temporary type for demonstration
type Observation = {
  id: string;
  faunaId: number;
  description: string;
  date: string;
  status: "synced" | "pending";
};

// Temporary mock data
const mockObservations: Observation[] = [
  {
    id: "1",
    faunaId: 1,
    description: "Observation test 1",
    date: "2024-04-19",
    status: "synced",
  },
  {
    id: "2",
    faunaId: 2,
    description: "Observation test 2",
    date: "2024-04-19",
    status: "pending",
  },
];

export const OfflineObservationList = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const renderItem = ({ item }: { item: Observation }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text variant="titleMedium">Observation #{item.faunaId}</Text>
          {item.status === "pending" && (
            <IconButton
              icon="sync"
              size={20}
              iconColor={theme.colors.primary}
              onPress={() => {}}
            />
          )}
        </View>
        <Text variant="bodyMedium" style={styles.description}>
          {item.description}
        </Text>
        <Text variant="bodySmall" style={styles.date}>
          {item.date}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={mockObservations}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const createStyles = (theme: any) =>
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
      alignItems: "center",
      marginBottom: 8,
    },
    description: {
      marginBottom: 8,
      color: theme.colors.onSurfaceVariant,
    },
    date: {
      color: theme.colors.onSurfaceVariant,
    },
  });
