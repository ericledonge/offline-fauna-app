import React, { useState } from "react";
import { Platform, View, StyleSheet } from "react-native";
import { TextInput, Button, Text, MD3Theme } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";

import { useTheme } from "@/hooks/useTheme";
import { useAddObservations } from "@/store/selectors";
import { FaunaSelector, Fauna } from "./FaunaSelector";

const FAUNA_LIST: Fauna[] = [
  { id: "119f3086-c003-4b53-a625-460833aaf662", name: "Sanglier", icon: "🐗" },
  { id: "146a0dae-b246-40f6-ac58-b1cad125c7d9", name: "Cerf", icon: "🦌" },
  {
    id: "8d08e666-982d-4cc3-92c2-e61696be5333",
    name: "Renard roux",
    icon: "🦊",
  },
  { id: "e3b1e2f8-1799-4c89-a8a5-d9f2aab1da2f", name: "Écureuil", icon: "🐿️" },
];

export const OfflineObservationForm = () => {
  const theme = useTheme();

  const styles = createStyles(theme);

  const addObservation = useAddObservations();

  const [selectedFaunaId, setSelectedFaunaId] = useState<string | null>(null);

  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (selectedFaunaId && description.trim()) {
      addObservation({
        id: uuidv4(),
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
        faunaList={FAUNA_LIST}
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
