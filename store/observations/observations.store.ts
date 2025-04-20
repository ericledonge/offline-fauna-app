import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { OfflineObservation } from "@/models/offline-observation.model";

export type ObservationSlice = {
  observations: OfflineObservation[];
  addObservation: (observation: OfflineObservation) => void;
  removeObservation: (observation: OfflineObservation) => void;
  clearObservations: () => void;
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
});
