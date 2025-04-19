import { useOfflineObservationStore } from "./store";

export const useAddObservations = () =>
  useOfflineObservationStore((state) => state.addObservation);

export const useRemoveObservations = () =>
  useOfflineObservationStore((state) => state.removeObservation);
