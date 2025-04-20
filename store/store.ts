import { Platform } from "react-native";
import { create } from "zustand";
import { persist, createJSONStorage, PersistStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createObservationSlice,
  ObservationSlice,
} from "./observations/observations.store";
import { createFaunaSlice, FaunaSlice } from "./fauna/fauna.store";

export type OfflineObservationStore = ObservationSlice &
  FaunaSlice & {
    clearStorage: () => void;
  };

const storage = Platform.select({
  web: createJSONStorage(() => localStorage),
  default: createJSONStorage(() => AsyncStorage),
}) as PersistStorage<OfflineObservationStore>;

export const useOfflineObservationStore = create<OfflineObservationStore>()(
  persist<OfflineObservationStore>(
    (set, get) => ({
      ...createObservationSlice(set, get),
      ...createFaunaSlice(set, get),
      clearStorage: () => {
        if (Platform.OS === "web") {
          localStorage.clear();
        } else {
          AsyncStorage.clear();
        }
        set({ observations: [], faunaList: [] });
      },
    }),
    {
      name: "OFFLINE_OBSERVATIONS",
      storage,
      version: 1,
    }
  )
);
