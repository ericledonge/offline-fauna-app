import { useOfflineObservationStore } from "./store";

export const useGetOfflineObservations = () =>
  useOfflineObservationStore((state) => state.observations);

export const useAddObservations = () =>
  useOfflineObservationStore((state) => state.addObservation);

export const useRemoveObservations = () =>
  useOfflineObservationStore((state) => state.removeObservation);

export const useGetFaunaList = () =>
  useOfflineObservationStore((state) => state.faunaList);

export const useSetFaunaList = () =>
  useOfflineObservationStore((state) => state.setFaunaList);

export const useMarkSynced = () =>
  useOfflineObservationStore((state) => state.markSynced);

export const useSetSyncError = () =>
  useOfflineObservationStore((state) => state.setSyncError);
