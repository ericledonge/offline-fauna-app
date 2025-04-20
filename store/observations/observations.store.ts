import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { OfflineObservation } from "@/models/offline-observation.model";

export type ObservationSlice = {
  observations: OfflineObservation[];
  addObservation: (observation: OfflineObservation) => void;
  removeObservation: (observation: OfflineObservation) => void;
  clearObservations: () => void;
  markSynced: (observationId: string) => void;
  setSyncError: (observationId: string, error: string) => void;
};

export const createObservationSlice = (set: any, get: any) => ({
  observations: [],
  addObservation: (observation: OfflineObservation) =>
    set((state: ObservationSlice) => ({
      observations: [...state.observations, observation],
    })),
  removeObservation: (observation: OfflineObservation) =>
    set((state: ObservationSlice) => ({
      observations: state.observations.filter(
        (o: OfflineObservation) => o.id !== observation.id
      ),
    })),
  clearObservations: () => {
    if (Platform.OS === "web") {
      localStorage.clear();
    } else {
      AsyncStorage.clear();
    }
    set((state: ObservationSlice) => ({
      observations: [],
    }));
  },
  markSynced: (observationId: string) =>
    set((state: ObservationSlice) => ({
      observations: state.observations.map((o: OfflineObservation) =>
        o.id === observationId
          ? { ...o, synced: true, syncError: undefined }
          : o
      ),
    })),
  setSyncError: (observationId: string, error: string) =>
    set((state: ObservationSlice) => ({
      observations: state.observations.map((o: OfflineObservation) =>
        o.id === observationId ? { ...o, syncError: error } : o
      ),
    })),
});
