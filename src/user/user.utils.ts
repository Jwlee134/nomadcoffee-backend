import client from "../client";
import jwt from "jsonwebtoken";
import { Context, Resolver } from "../types";

export const getLoggedInUser = async (token?: string | string[]) => {
  if (!token) return null;
  const id = +jwt.verify(token as string, process.env.SECRET_KEY!);
  const user = await client.user.findUnique({ where: { id } });
  return user;
};

export const protectedResolver =
  (resolver: Resolver) =>
  (root: any, args: any, context: Context, info: any) => {
    if (!context?.loggedInUser) {
      return { ok: false, error: "You need to login." };
    }
    return resolver(root, args, context, info);
  };
