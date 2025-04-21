import { ReactNode } from "react";
import { PaperProvider } from "react-native-paper";
import { ApolloProvider } from "@apollo/client";

import { theme } from "@/constants/theme";
import { apolloClient } from "@/services/api/apollo-client";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ApolloProvider>
  );
}
