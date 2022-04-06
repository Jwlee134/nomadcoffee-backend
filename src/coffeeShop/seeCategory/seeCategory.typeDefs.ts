import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeCategory(keyword: String!, lastId: Int): [CoffeeShop]
  }
`;
