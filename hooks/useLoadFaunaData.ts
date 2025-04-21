import { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { useSetFaunaList } from "@/store/selectors";
import { GET_FAUNA_OPTIONS } from "../services/api/observations.graphql";

export const useLoadFaunaData = () => {
  const setFaunaList = useSetFaunaList();

  const { data } = useQuery(GET_FAUNA_OPTIONS);

  useEffect(() => {
    if (data?.allFaunaDetails) {
      setFaunaList(data.allFaunaDetails);
    }
  }, [data, setFaunaList]);
};
