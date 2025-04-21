import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { API_URL } from "@/constants/api";

// Création de la cache Apollo
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Configurations des politiques de champs si nécessaire
      },
    },
  },
});

// Lien pour gérer les erreurs
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// Lien HTTP pour les requêtes
const httpLink = new HttpLink({
  uri: API_URL,
});

// Création du client Apollo
export const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
