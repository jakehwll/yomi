import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { getFilesData, updateBook } from 'util/book'
import { getDirectoryFiles } from 'util/fs'
import prisma from 'util/prisma'
import { getAuthorisedAdmin } from 'util/users'

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const session = await getSession({ req })
  const response = await prisma.book.findFirst({
    where: {
      id: {
        equals: id?.toString(),
      },
    },
    include: {
      Series: true,
      ReadProgress: {
        distinct: ['bookId', 'userId'],
      },
    },
  })
  if (!response || !response.Series)
    return res.status(404).json({ error: 'Resource not found.', code: 404 })
  // TODO. Resolve pagecount to current number.
  const files = await getDirectoryFiles({
    path: `${response.Series.folder}${response.folder}`,
  })
  let filesData = getFilesData({ files: files })
  res.status(200).json({
    collection: 'book',
    data: response,
    pages: Object.keys(filesData).length ?? 0,
  })
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedAdmin(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  // gather the id and body from the request
  const { id } = req.query
  const data = req.body
  // attempt to update the book and serve the data to the user.
  const response = updateBook(id as string, data)
  res.status(200).json({
    collection: 'book',
    data: response,
  })
}

async function _delete(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedAdmin(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  // gather the id from the request
  const { id } = req.query
  const response = await prisma.book.delete({
    where: {
      id: id as string,
    },
  })
  res.status(200).json({
    collection: 'book',
    data: response,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else if (req.method === 'PATCH') update(req, res)
  else if (req.method === 'DELETE') _delete(req, res)
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
