export type Observation = {
  id: string;
  faunaId: string;
  description: string;
  timestamp: number;
  synced?: boolean;
  syncError?: string;
};
