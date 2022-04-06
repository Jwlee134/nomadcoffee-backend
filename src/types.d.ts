import { PrismaClient, User } from "@prisma/client";

type Context = {
  client: PrismaClient;
  loggedInUser?: User;
};

type Resolver = (root: any, args: any, context: Context, info: any) => any;

type List =
  | "Query"
  | "Mutation"
  | "Subscription"
  | "Upload"
  | "User"
  | "Category";

type Resolvers = {
  [key in List]?: {
    [key: string]: Resolver;
  };
};
