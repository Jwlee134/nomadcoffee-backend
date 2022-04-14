import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      latitude: String
      longitude: String
      newPhotos: [Upload]
      photoIdsToDelete: [Int]
      categories: [String]
      deleteShop: Boolean
    ): MutationResponse
  }
`;
