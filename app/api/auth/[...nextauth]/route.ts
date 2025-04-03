import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Extend the default session user type to include our custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  }
}

// Extend JWT type to include our custom properties
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // In a production app, this would fetch the user from the database
        // Here, we simulate a successful auth for demonstration

        // Production implementation:
        // const user = await prisma.user.findUnique({
        //   where: { email: credentials.email },
        // });

        // if (!user || !user.password) {
        //   return null;
        // }

        // const isValidPassword = await compare(credentials.password, user.password);
        // if (!isValidPassword) {
        //   return null;
        // }

        // return {
        //   id: user.id,
        //   name: user.name,
        //   email: user.email,
        //   role: user.role,
        //   image: user.image,
        // };

        // For demo purposes, hardcoded users:
        const demoUsers = [
          {
            id: "1",
            name: "Demo Buyer",
            email: "buyer@example.com",
            password: "password123",
            role: "BUYER",
            image: null,
          },
          {
            id: "2",
            name: "Demo Developer",
            email: "developer@example.com",
            password: "password123",
            role: "DEVELOPER",
            image: null,
          },
        ];

        const user = demoUsers.find((user) => user.email === credentials.email);

        if (!user || user.password !== credentials.password) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = token.id;
        session.user.role = token.role || null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
