import { DefaultTheme } from "react-native-paper";

export type Theme = typeof theme;

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#006C35",
    onPrimary: "#FFFFFF",
    primaryContainer: "#94F7B6",
    onPrimaryContainer: "#00210E",
    secondary: "#516350",
    onSecondary: "#FFFFFF",
    background: "#FCFDF6",
    surface: "#FCFDF6",
    error: "#BA1A1A",
  },
};
