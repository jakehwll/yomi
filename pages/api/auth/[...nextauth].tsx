import { compare } from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import prisma from 'util/prisma'

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials: any) => {
        // find who we're trying to login as.
        const user = await prisma.account.findFirst({
          where: {
            email: credentials.email,
          },
        })
        // nope. no user found.
        if (!user) return null
        // is the password correct?
        if (await compare(credentials.password, user.password)) return user
        // nope. password incorrect.
        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.id = user.id
      return token
    },
    session: async ({ session, token }) => {
      if (token) session.id = token.id
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
})
