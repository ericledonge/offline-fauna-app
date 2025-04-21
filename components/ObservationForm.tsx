import React, { useState } from "react";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { useNetworkState } from "expo-network";

import { useTheme } from "@/hooks/useTheme";
import { useAddObservations } from "@/store/selectors";
import { useGetFaunaList } from "@/store/selectors";
import { FaunaSelector } from "./FaunaSelector";
import { generateId } from "@/utils/generateId";

export const ObservationForm = () => {
  const theme = useTheme();

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
    <Card style={{ backgroundColor: theme.colors.surface }}>
      <Card.Title
        title="Nouvelle Observation"
        titleVariant="titleMedium"
        style={{
          padding: 16,
        }}
      />

      <Card.Content style={{ gap: 16 }}>
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
          style={{}}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!selectedFaunaId || !description.trim()}
          style={{}}
        >
          Enregistrer
        </Button>

        {!isConnected && (
          <Text style={{ color: theme.colors.onSurfaceVariant }}>
            Mode hors-ligne: Les observations seront synchronisées lorsque vous
            serez en ligne
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};
