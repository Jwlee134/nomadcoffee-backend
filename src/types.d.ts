import { PrismaClient } from "@prisma/client";

type Context = {
  client: PrismaClient;
};

type Resolver = (root: any, args: any, context: Context, info: any) => any;

type List = "Query" | "Mutation" | "Subscription";

export type Resolvers = {
  [key in List]?: {
    [key: string]: Resolver;
  };
};
