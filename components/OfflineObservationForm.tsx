import React, { useState } from "react";
import { Platform, View } from "react-native";
import { TextInput, Button, Text, MD3Theme } from "react-native-paper";
import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
// import { observer } from 'mobx-react-lite';
// import { useOfflineObservationStore } from '../../stores/helpers/useStores';

export const OfflineObservationForm = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  //   const store = useOfflineObservationStore();

  const [faunaId, setFaunaId] = useState<number | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (faunaId && description.trim()) {
      //   store.addObservation(faunaId, description);
      setDescription("");
      setFaunaId(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>
        Nouvelle Observation
      </Text>

      {/* Sélecteur de Faune - à implémenter */}

      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        // disabled={!faunaId || !description.trim() || !store.isOnline}
        style={styles.button}
      >
        Enregistrer
      </Button>

      {/* {!store.isOnline && (
        <Text style={styles.offlineNotice}>
          Mode hors-ligne: Les observations seront synchronisées lorsque vous serez en ligne
        </Text>
      )} */}
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      marginBottom: 16,
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
    title: {
      marginBottom: 16,
      color: theme.colors.onSurface,
    },
    input: {
      marginBottom: 16,
      backgroundColor: theme.colors.surfaceVariant,
    },
    button: {
      marginTop: 8,
    },
    offlineNotice: {
      marginTop: 16,
      color: theme.colors.error,
      textAlign: "center",
      fontSize: 14,
    },
  });
