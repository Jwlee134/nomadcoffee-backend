import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    toggleFollow(id: Int!, follow: Boolean!): MutationResponse
  }
`;
