import { useTheme as usePaperTheme } from "react-native-paper";

import { Theme } from "@/constants/theme";

export const useTheme = (): Theme => {
  const theme = usePaperTheme();

  return theme;
};
