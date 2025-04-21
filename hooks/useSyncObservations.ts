import { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";

import { useNetworkStatus } from "./useGetNetworkStatus";
import { useGetUnsyncedObservations } from "@/store/selectors";
import { useMarkSynced } from "@/store/selectors";
import { useSetSyncError } from "@/store/selectors";
import { ADD_OBSERVATION_MUTATION } from "@/services/api/observations.graphql";
import { logger } from "@/services/logger";

export const useSyncObservations = () => {
  const isConnected = useNetworkStatus();
  const getUnsyncedObservations = useGetUnsyncedObservations();
  const markSynced = useMarkSynced();
  const setSyncError = useSetSyncError();
  const isSyncing = useRef(false);

  const [addObservation] = useMutation(ADD_OBSERVATION_MUTATION);

  useEffect(() => {
    const checkAndSync = async () => {
      if (isSyncing.current) {
        logger.log("🔄 Already syncing, skipping...");
        return;
      }

      const unsyncedObservations = getUnsyncedObservations();
      logger.log("🔍 Checking for unsynced observations", {
        count: unsyncedObservations.length,
        isConnected,
      });

      if (!isConnected || unsyncedObservations.length === 0) {
        return;
      }

      isSyncing.current = true;
      logger.log("🚀 Starting sync process", {
        count: unsyncedObservations.length,
      });

      try {
        for (const observation of unsyncedObservations) {
          try {
            logger.log("📤 Syncing observation", {
              id: observation.id,
              faunaId: observation.faunaId,
            });

            const { data } = await addObservation({
              variables: {
                input: {
                  faunaId: observation.faunaId,
                  description: observation.description,
                },
              },
            });

            if (data?.addObservation) {
              markSynced(observation.id);
              logger.log("✅ Observation synced", {
                id: observation.id,
                faunaId: observation.faunaId,
              });
            }
          } catch (error) {
            setSyncError(
              observation.id,
              error instanceof Error ? error.message : "Unknown error"
            );
            logger.error("❌ Failed to sync observation", {
              id: observation.id,
              error: error instanceof Error ? error.message : "Unknown error",
            });
          }
        }
      } finally {
        isSyncing.current = false;
        logger.log("🏁 Sync process completed");
      }
    };

    // Check immediately when the effect runs
    checkAndSync();

    // Set up an interval to check periodically
    const intervalId = setInterval(checkAndSync, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    isConnected,
    getUnsyncedObservations,
    addObservation,
    markSynced,
    setSyncError,
  ]);
};
