import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from 'util/prisma'
import { getAuthorisedUser, getUser } from 'util/users'

async function post(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedUser(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  // get our user
  const session = await getSession({ req })
  const user = await getUser(session?.user?.email ?? '')
  if (!user) return
  // gather the id and body from the request
  const { id } = req.query
  const data = req.body
  // attempt to update the book and serve the data to the user.
  const response = await prisma.readProgress.upsert({
    where: {
      userId_bookId: {
        userId: user.id,
        bookId: id.toString(),
      },
    },
    update: {
      progress: data.progress,
    },
    create: {
      userId: user.id,
      bookId: id.toString(),
      progress: data.progress,
    },
  })
  res.status(200).json({
    collection: 'read_progress',
    data: response,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') post(req, res)
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
