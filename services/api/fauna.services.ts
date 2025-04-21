import { apolloClient } from "./apollo-client";
import { GET_FAUNA_OPTIONS } from "./observations.graphql";

export const fetchFaunaOptions = async () => {
  try {
    console.log("🌍 Fetching fauna options...");
    const { data } = await apolloClient.query({
      query: GET_FAUNA_OPTIONS,
    });
    console.log("✅ Fauna options received:", data.allFaunaDetails);
    return data.allFaunaDetails;
  } catch (error) {
    console.error("❌ Error fetching fauna options:", error);
    throw error;
  }
};
