import { Fauna } from "@/models/fauna.model";
import { FAUNA_LIST } from "@/metadata/fauna-list";

export type FaunaSlice = {
  faunaList: Fauna[];
  setFaunaList: (faunaList: Fauna[]) => void;
};

export const createFaunaSlice = (set: any, get: any) => ({
  faunaList: FAUNA_LIST,
  setFaunaList: (faunaList: Fauna[]) =>
    set((state: FaunaSlice) => ({
      faunaList,
    })),
});
