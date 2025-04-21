import { gql } from "@apollo/client";

export const ADD_OBSERVATION_MUTATION = gql`
  mutation AddObservation($input: ObservationInput!) {
    addObservation(input: $input) {
      id
      faunaId
      description
      createdAt
    }
  }
`;

export const GET_FAUNA_OPTIONS = gql`
  query GetFaunaOptions {
    allFaunaDetails {
      id
      name
      icon
    }
  }
`;
