import { hash } from 'bcrypt'
import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'
import prisma from './prisma'

/**
 * Get all users registered to the app.
 * @returns Array<User> object.
 */
export const getUsers = async () => {
  return prisma.user.findMany()
}

/**
 * Grab a user based on their email address.
 * @param email String of the users email.
 * @returns Found user object or null.
 */
export const getUser = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  })
}

/**
 * Grab an account based on their email address.
 * @param email String of the accounts email.
 * @returns Found account object or null.
 */
export const getAccount = async (email: string) => {
  return await prisma.account.findFirst({
    where: {
      email,
    },
  })
}

/**
 * Returns whether the user is logged in to use a route.
 * @param req The request from your given endpoint.
 * @returns Boolean of access allowed or denied.
 */
export const getAuthorisedUser = async (req: NextApiRequest) => {
  const session = await getSession({ req })
  if (!session) return false
  if (session.user) return true
  return false
}

/**
 * Returns whether the user is logged in and admin to use a route.
 * @param req The request from your given endpoint.
 * @returns Boolean of access allowed or denied.
 */
export const getAuthorisedAdmin = async (req?: NextApiRequest) => {
  const session = await getSession({ req })
  if (!session) return false
  if (session.user) {
    const user = await getAccount(session.user.email ?? '')
    return user ? user.isAdmin : false
  } else return false
}

/**
 * Creates a new user in the Database to be associated with an account.
 * @param email The email address of the new user.
 * @returns <User /> object that was created.
 */
export const createUser = async (email: string) => {
  return await prisma.user.create({
    data: {
      email: email,
    },
  })
}

/**
 * Creates a new account in the Database from its associated user.
 * @param email The email address of the new account.
 * @param password The password of the new account (bcrypt).
 * @param userId The previously created `createUser()`'s ID.
 * @param isAdmin Whether the user should have admin permission.
 * @returns <User /> object.
 */
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
