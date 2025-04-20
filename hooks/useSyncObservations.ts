import { useEffect } from "react";
import { useNetworkState } from "expo-network";

import { useGetOfflineObservations } from "@/store/selectors";
import { useSyncObservation } from "./useSyncObservation";
import { useMarkSynced, useSetSyncError } from "@/store/selectors";

export function useSyncObservations() {
  const { isConnected } = useNetworkState();
  const observations = useGetOfflineObservations();
  const { mutate: syncObservation } = useSyncObservation();
  const markSynced = useMarkSynced();
  const setSyncError = useSetSyncError();

  useEffect(() => {
    if (!isConnected) {
      console.log("No internet connection, skipping sync");
      return;
    }

    const unsyncedObservations = observations.filter((o) => !o.synced);

    if (unsyncedObservations.length === 0) {
      console.log("No observations to sync");
      return;
    }

    console.log(`Syncing ${unsyncedObservations.length} observations...`);

    unsyncedObservations.forEach((observation) => {
      syncObservation(observation, {
        onSuccess: () => {
          markSynced(observation.id);
        },
        onError: (error) => {
          setSyncError(observation.id, error.message);
        },
      });
    });
  }, [isConnected, observations, syncObservation, markSynced, setSyncError]);
}
