type Resolver = (root: any, args: any, context: any, info: any) => any;

type List = "Query" | "Mutation" | "Subscription";

export type Resolvers = {
  [key in List]?: {
    [key: string]: Resolver;
  };
};
