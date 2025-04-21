import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Observation } from "@/models/observation.model";

export type ObservationSlice = {
  observations: Observation[];
  addObservation: (observation: Observation) => void;
  removeObservation: (observation: Observation) => void;
  clearObservations: () => void;
  markSynced: (observationId: string) => void;
  setSyncError: (observationId: string, error: string) => void;
  getUnsyncedObservations: () => Observation[];
  getSyncedObservations: () => Observation[];
};

export const createObservationSlice = (set: any, get: any) => ({
  observations: [],
  addObservation: (observation: Observation) =>
    set((state: ObservationSlice) => ({
      observations: [...state.observations, observation],
    })),
  removeObservation: (observation: Observation) =>
    set((state: ObservationSlice) => ({
      observations: state.observations.filter(
        (o: Observation) => o.id !== observation.id
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
      observations: state.observations.map((o: Observation) =>
        o.id === observationId
          ? { ...o, synced: true, syncError: undefined }
          : o
      ),
    })),
  setSyncError: (observationId: string, error: string) =>
    set((state: ObservationSlice) => ({
      observations: state.observations.map((o: Observation) =>
        o.id === observationId ? { ...o, syncError: error } : o
      ),
    })),
  getUnsyncedObservations: () =>
    get().observations.filter((o: Observation) => !o.synced),
  getSyncedObservations: () =>
    get().observations.filter((o: Observation) => o.synced),
});
