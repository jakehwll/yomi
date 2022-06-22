import { hash } from 'bcrypt'
import prisma from './prisma'

export const getUser = async (email: string) => {
  return await prisma.users.findFirst({
    where: {
      email,
    },
  })
}

export const createUser = async (email: string, password: string) => {
  return await prisma.users.create({
    data: {
      email: email,
      password: await hash(password, 10),
    },
  })
}
