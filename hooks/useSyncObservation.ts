import { useMutation } from "@tanstack/react-query";

import { OfflineObservation } from "@/models/offline-observation.model";

const API_URL = "https://offline-fauna-backend.vercel.app/api/graphql";

async function syncObservation(observation: OfflineObservation) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation AddObservation($input: ObservationInput!) {
          addObservation(input: $input) {
            id
            faunaId
            description
            createdAt
          }
        }
      `,
      variables: {
        input: {
          faunaId: observation.faunaId,
          description: observation.description,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message);
  }

  if (!data?.addObservation) {
    throw new Error("Invalid response format");
  }

  return data.addObservation;
}

export function useSyncObservation() {
  return useMutation({
    mutationFn: syncObservation,
    onSuccess: (data, variables) => {
      console.log(`Successfully synced observation ${variables.id}`);
    },
    onError: (error, variables) => {
      console.error(`Failed to sync observation ${variables.id}:`, error);
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
