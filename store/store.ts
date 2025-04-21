import { Platform } from "react-native";
import { create } from "zustand";
import { persist, createJSONStorage, PersistStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createObservationSlice,
  ObservationSlice,
} from "./observations/observations.store";
import { createFaunaSlice, FaunaSlice } from "./fauna/fauna.store";

export type ObservationStore = ObservationSlice & FaunaSlice;

const storage = Platform.select({
  web: createJSONStorage(() => localStorage),
  default: createJSONStorage(() => AsyncStorage),
}) as PersistStorage<ObservationStore>;

export const useObservationStore = create<ObservationStore>()(
  persist<ObservationStore>(
    (set, get) => ({
      ...createObservationSlice(set, get),
      ...createFaunaSlice(set, get),
    }),
    {
      name: "OBSERVATIONS",
      storage,
      version: 1,
    }
  )
);
