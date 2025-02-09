import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUserByEmail } from "./db/queries";
import { Email } from "./sharedTypes/types";
import useUserStore from "./hooks/store/useUser";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // restrict access tojust @coloradocollege.edu emails
      if (!user.email?.endsWith("@coloradocollege.edu")) {
        return false; // failed signin
      }
      return true; //alow sign-in
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
