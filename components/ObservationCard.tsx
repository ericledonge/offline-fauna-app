import { View, StyleSheet, Platform } from "react-native";
import { Text, useTheme, Card, IconButton, MD3Theme } from "react-native-paper";

import { OfflineObservation } from "@/models/offline-observation.model";
import { useGetFaunaList } from "@/store/selectors";

interface ObservationCardProps {
  observation: OfflineObservation;
}

export const ObservationCard = ({ observation }: ObservationCardProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

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

        {!observation.synced && (
          <IconButton
            icon="sync"
            size={20}
            iconColor={theme.colors.primary}
            onPress={() => {}}
            style={styles.syncButton}
          />
        )}
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
    syncButton: {
      margin: 0,
      marginTop: -8,
      marginRight: -8,
    },
  });
