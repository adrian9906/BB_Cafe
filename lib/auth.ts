import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import crypto from 'crypto';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials:{
        email: {label: "email"},
        password: {label: "password"}
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email
          }
        })
        if(!user) return null
        const password = crypto.createHash('sha256').update(credentials?.password || "").digest('hex')
        if(password !== user.password) return null
        return user
      }
    })
  ]
  }