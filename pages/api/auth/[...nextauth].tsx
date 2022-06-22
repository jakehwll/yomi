import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import prisma from 'util/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
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
        const user = await prisma.users.findFirst({
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
    jwt: ({ token, user }) => {
      if (user) token.id = user.id
      return token
    },
    session: ({ session, token }) => {
      if (token) session.id = token.id
      return session
    },
  },
  secret: 'h!3HD3sK^SrAa@',
  jwt: {
    secret: 'h!3HD3sK^SrAa@',
  },
})
