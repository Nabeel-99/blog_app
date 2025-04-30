import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, LinkedIn],
  callbacks: {
    async signIn({ user: { email, name, image } }) {
      if (email) {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: name,
              email: email,
              image: image,
              role: "USER",
            },
          });
        }
      } else {
        await prisma.user.create({
          data: {
            name: name,
            email: null,
            image: image,
            role: "USER",
          },
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        let dbUser = null;
        if (user.email) {
          dbUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
        }
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      Object.assign(session.user, { id: token.id, role: token.role });
      return session;
    },
  },
});
