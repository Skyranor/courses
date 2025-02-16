import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider, { EmailUserConfig } from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { dbClient } from "@/shared/lib/db";
import { compact } from "lodash-es";
import { privateConfig } from "@/shared/config/private";
import { createUserUseCase } from "./_use-cases/create-user";
import { Adapter, AdapterUser } from "next-auth/adapters";

const prismaAdapter = PrismaAdapter(dbClient);

const emailToken: Pick<
  EmailUserConfig,
  "generateVerificationToken" | "sendVerificationRequest"
> = privateConfig.TEST_EMAIL_TOKEN
  ? {
      generateVerificationToken: () => privateConfig.TEST_EMAIL_TOKEN ?? "",
      sendVerificationRequest: () => {
        console.log("we don't send emails in test mode");
      },
    }
  : {};

export const nextAuthConfig: AuthOptions = {
  adapter: {
    ...prismaAdapter,
    createUser: (user: AdapterUser) => {
      return createUserUseCase.execute(user);
    },
  } as unknown as Adapter,
  callbacks: {
    session: async (data) => {
      const { session, user } = data;
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/new-user",
    verifyRequest: "/auth/verify-request",
  },
  providers: compact([
    EmailProvider({
      ...emailToken,
      server: {
        host: privateConfig.EMAIL_SERVER_HOST,
        port: Number(privateConfig.EMAIL_SERVER_PORT),
        auth: {
          user: privateConfig.EMAIL_SERVER_USER,
          pass: privateConfig.EMAIL_SERVER_PASSWORD,
        },
      },
      from: privateConfig.EMAIL_FROM,
    }),
    privateConfig.GITHUB_ID &&
      privateConfig.GITHUB_SECRET &&
      GithubProvider({
        clientId: privateConfig.GITHUB_ID,
        clientSecret: privateConfig.GITHUB_SECRET,
      }),
  ]),
};
