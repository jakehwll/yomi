import { hash } from 'bcrypt'
import prisma from './prisma'

export const getUser = async (email: string) => {
  return await prisma.account.findFirst({
    where: {
      email,
    },
  })
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
  userId: string
) => {
  return await prisma.account.create({
    data: {
      email: email,
      password: await hash(password, 10),
      userId: userId,
    },
  })
}
