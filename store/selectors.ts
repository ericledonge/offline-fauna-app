import { useObservationStore } from "./store";

export const useGetObservations = () =>
  useObservationStore((state) => state.observations);

export const useAddObservations = () =>
  useObservationStore((state) => state.addObservation);

export const useRemoveObservations = () =>
  useObservationStore((state) => state.removeObservation);

export const useGetFaunaList = () =>
  useObservationStore((state) => state.faunaList);

export const useSetFaunaList = () =>
  useObservationStore((state) => state.setFaunaList);

export const useMarkSynced = () =>
  useObservationStore((state) => state.markSynced);

export const useSetSyncError = () =>
  useObservationStore((state) => state.setSyncError);

export const useClearObservations = () =>
  useObservationStore((state) => state.clearObservations);

export const useGetUnsyncedObservations = () =>
  useObservationStore((state) => state.getUnsyncedObservations);

export const useGetSyncedObservations = () =>
  useObservationStore((state) => state.getSyncedObservations);
