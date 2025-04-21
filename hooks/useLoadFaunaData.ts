import { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { useSetFaunaList } from "@/store/selectors";
import { GET_FAUNA_OPTIONS } from "../services/api/observations.graphql";
import { logger } from "../services/logger";

export const useLoadFaunaData = () => {
  const setFaunaList = useSetFaunaList();

  const { data, loading, error } = useQuery(GET_FAUNA_OPTIONS);

  useEffect(() => {
    if (loading) {
      logger.log("🔄 Loading fauna data...");
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      logger.error("❌ Error loading fauna data", {
        error: error.message,
        stack: error.stack,
      });
    }
  }, [error]);

  useEffect(() => {
    if (data?.allFaunaDetails) {
      logger.log("✅ Fauna data loaded", {
        count: data.allFaunaDetails.length,
        data: data.allFaunaDetails,
      });
      setFaunaList(data.allFaunaDetails);
    }
  }, [data, setFaunaList]);
};
