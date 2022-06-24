import { hash } from 'bcrypt'
import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'
import prisma from './prisma'

export const getUsers = async () => {
  return await prisma.user.count
}

export const getUser = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  })
}

export const getAccount = async (email: string) => {
  return await prisma.account.findFirst({
    where: {
      email,
    },
  })
}

export const getAuthorisedUser = async (req: NextApiRequest) => {
  const session = await getSession({ req })
  if (!session) return false
  if (session.user) return true
  return false
}

export const getAuthorisedAdmin = async (req?: NextApiRequest) => {
  const session = await getSession({ req })
  if (!session) return false
  if (session.user) {
    const user = await getAccount(session.user.email ?? '')
    return user ? user.isAdmin : false
  } else return false
}

export const createUser = async (email: string) => {
  return await prisma.user.create({
    data: {
      email: email,
    },
  })
}

export const createAccount = async (
  email: string,
  password: string,
  userId: string,
  isAdmin: boolean
) => {
  return await prisma.account.create({
    data: {
      email: email,
      password: await hash(password, 10),
      userId: userId,
      isAdmin: isAdmin,
    },
  })
}
