import { ReactNode } from "react";
import { PaperProvider } from "react-native-paper";

import { theme } from "@/constants/theme";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
