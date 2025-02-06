/* eslint-disable @typescript-eslint/no-empty-object-type */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
import { SessionEntity, UserEntity } from "./_domain/types";

declare module "next-auth" {
  interface Session extends SessionEntity {
    user: SessionEntity["user"];
  }
  interface User extends UserEntity {}
}
