import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Twitter from "next-auth/providers/twitter";
import LinkedIn from "next-auth/providers/linkedin";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook, Twitter, LinkedIn],
});
