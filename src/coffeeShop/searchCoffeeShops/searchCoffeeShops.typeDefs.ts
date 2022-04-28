import { gql } from "apollo-server-express";

export default gql`
  type Query {
    searchCoffeeShops(lastId: Int, keyword: String): [CoffeeShop]
  }
`;
