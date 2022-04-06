import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      latitude: String
      longitude: String
      newPhoto: Upload
      photoIdToDelete: Int
      categories: [String]
    ): MutationResponse
  }
`;
