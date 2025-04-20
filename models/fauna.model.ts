export type Fauna = {
  id: string;
  name: string;
  icon: string;
};

export const getFaunaIcon = (fauna: Fauna) => {
  return fauna.icon;
};
