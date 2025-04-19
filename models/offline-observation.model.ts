export type OfflineObservation = {
  id: string;
  faunaId: string;
  description: string;
  timestamp: number;
  synced?: boolean;
  syncError?: string;
};
