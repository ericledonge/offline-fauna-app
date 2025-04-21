import React, { useState } from "react";
import { Platform, View, StyleSheet } from "react-native";
import { TextInput, Button, Text, MD3Theme } from "react-native-paper";
import { useNetworkState } from "expo-network";

import { useTheme } from "@/hooks/useTheme";
import { useAddObservations } from "@/store/selectors";
import { useGetFaunaList } from "@/store/selectors";
import { FaunaSelector } from "./FaunaSelector";
import { generateId } from "@/utils/generateId";

export const ObservationForm = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const { isConnected } = useNetworkState();

  const addObservation = useAddObservations();
  const faunaList = useGetFaunaList();

  const [selectedFaunaId, setSelectedFaunaId] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (selectedFaunaId && description.trim()) {
      addObservation({
        id: generateId(),
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

      {!isConnected && (
        <Text style={styles.offlineNotice}>
          Mode hors-ligne: Les observations seront synchronisées lorsque vous
          serez en ligne
        </Text>
      )}
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
    title: {
      marginBottom: 16,
    },
    input: {
      marginBottom: 16,
    },
    button: {
      marginBottom: 8,
    },
    offlineNotice: {
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
      fontSize: 12,
    },
  });
