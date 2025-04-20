import React, { useState } from "react";
import { Platform, View, StyleSheet } from "react-native";
import { TextInput, Button, Text, MD3Theme } from "react-native-paper";
import { randomUUID } from "expo-crypto";

import { useTheme } from "@/hooks/useTheme";
import { useAddObservations } from "@/store/selectors";
import { useGetFaunaList } from "@/store/selectors";
import { FaunaSelector } from "./FaunaSelector";

export const OfflineObservationForm = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const addObservation = useAddObservations();
  const faunaList = useGetFaunaList();

  const [selectedFaunaId, setSelectedFaunaId] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (selectedFaunaId && description.trim()) {
      addObservation({
        id: randomUUID(),
        faunaId: selectedFaunaId,
        description,
        timestamp: Date.now(),
      });
      setDescription("");
      setSelectedFaunaId(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>
        Nouvelle Observation
      </Text>

      <FaunaSelector
        selectedFaunaId={selectedFaunaId}
        onSelectFauna={setSelectedFaunaId}
        faunaList={faunaList}
      />

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
        disabled={!selectedFaunaId || !description.trim()}
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
