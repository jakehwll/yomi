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
          type: 'text',
          placeholder: 'johndoe@test.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
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
  secret: 'h!3HD3sK^SrAa@',
  jwt: {
    secret: 'h!3HD3sK^SrAa@',
  },
})
