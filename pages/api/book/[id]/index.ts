import { NextApiRequest, NextApiResponse } from 'next'
import { getBook, updateBook } from 'util/book'
import prisma from 'util/prisma'

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const response = await getBook(id as string)
  res.status(200).json({
    data: response,
  })
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const data = req.body
  const response = updateBook(id as string, data)
  res.status(200).json({
    data: response,
  })
}

async function _delete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const response = await prisma.book.delete({
    where: {
      id: id as string,
    },
  })
  res.status(200).json({
    data: response,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else if (req.method === 'UPDATE') update(req, res)
  else if (req.method === 'DELETE') _delete(req, res)
  else res.status(404)
}
