import { ReactNode } from "react";
import { PaperProvider } from "react-native-paper";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <PaperProvider>{children}</PaperProvider>;
}
