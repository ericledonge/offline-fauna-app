import { useEffect } from "react";

import { useSetFaunaList } from "@/store/selectors";
import { FAUNA_LIST } from "@/metadata/fauna-list";

const API_URL = "https://offline-fauna-backend.vercel.app/api/graphql";

export const useGetFauna = () => {
  const setFaunaList = useSetFaunaList();

  useEffect(() => {
    const fetchFauna = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query AllFaunaDetails {
                allFaunaDetails {
                  id
                  name
                  icon
                }
              }
            `,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        if (data?.allFaunaDetails) {
          setFaunaList(data.allFaunaDetails);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.warn("Using fallback fauna data due to:", error);
        setFaunaList(FAUNA_LIST);
      }
    };

    fetchFauna();
  }, [setFaunaList]);
};
