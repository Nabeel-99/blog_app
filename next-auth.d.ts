import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      id: string;
      name: string;
      email: string;
      image: string;
      bio: string;
    };
  }
  interface User {
    role: string;
    id: string;
    name: string;
    email: string;
    image: string;
    bio: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    id: string;
    bio: string;
  }
}
