import { Platform } from "react-native";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { OfflineObservation } from "../models/offline-observation.model";

type OfflineObservationStore = {
  observations: OfflineObservation[];
  addObservation: (observation: OfflineObservation) => void;
  removeObservation: (observation: OfflineObservation) => void;
};

const storage = Platform.select({
  web: createJSONStorage(() => localStorage),
  default: createJSONStorage(() => AsyncStorage),
});

export const useOfflineObservationStore = create<OfflineObservationStore>()(
  persist(
    (set) => ({
      observations: [],
      addObservation: (observation: OfflineObservation) =>
        set((state) => ({
          observations: [...state.observations, observation],
        })),
      removeObservation: (observation: OfflineObservation) =>
        set((state) => ({
          observations: state.observations.filter(
            (o) => o.id !== observation.id
          ),
        })),
    }),
    {
      name: "offline-observations",
      storage,
    }
  )
);
