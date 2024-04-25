import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/utils";
import authconfig from "./auth.config";
import { getUserById } from "./server/auth/lib";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authconfig,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;
      const userProfile = await prisma.profile.findFirst({
        where: {
          userId: user.id,
        },
      });
      if (!userProfile) return token;
      token.profile = userProfile;

      return token;
    },
    async session({ session, token, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.profile) {
        session.user.profile = token.profile;
      }

      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id!);

      // Prevent sign in if email is not verified
      if (!existingUser?.emailVerified) return false;

      //TODO: Implement 2FA

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
});
