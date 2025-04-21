import { View, StyleSheet, Platform } from "react-native";
import { Text, useTheme, Card, MD3Theme, IconButton } from "react-native-paper";
import { Trash } from "lucide-react-native";

import { Observation } from "@/models/observation.model";
import { useGetFaunaList, useRemoveObservations } from "@/store/selectors";
import { SyncStatusIcon } from "./SyncStatusIcon";

type ObservationCardProps = {
  observation: Observation;
};

export const ObservationCard = ({ observation }: ObservationCardProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const removeObservation = useRemoveObservations();

  const fauna = useGetFaunaList().find((f) => f.id === observation.faunaId);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.mainContent}>
          {fauna && (
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{fauna.icon}</Text>
            </View>
          )}

          <View style={styles.textContent}>
            <Text variant="titleMedium" style={styles.description}>
              {observation.description}
            </Text>

            <Text variant="bodySmall" style={styles.date}>
              {new Date(observation.timestamp).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <SyncStatusIcon isSynced={!!observation.synced} />

          <IconButton
            icon={() => <Trash color="red" size={20} />}
            onPress={() => removeObservation(observation)}
            style={styles.deleteButton}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      marginBottom: 8,
      backgroundColor: theme.colors.surface,
      ...Platform.select({
        ios: {
          boxShadow: `0 2px 4px ${theme.colors.shadow}`,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      }),
    },
    cardContent: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16,
      paddingVertical: 12,
    },
    mainContent: {
      flex: 1,
      flexDirection: "row",
      gap: 12,
      alignItems: "flex-start",
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      fontSize: 24,
    },
    textContent: {
      flex: 1,
      gap: 4,
    },
    description: {
      color: theme.colors.onSurface,
      lineHeight: 20,
    },
    date: {
      color: theme.colors.onSurfaceVariant,
    },
    error: {
      color: theme.colors.error,
    },
    actionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    deleteButton: {
      margin: 0,
      padding: 0,
      backgroundColor: theme.colors.errorContainer,
    },
  });
