import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'util/prisma'

async function post(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return
  const _ = await prisma.book.create({
    data: JSON.parse(req.body),
  })
  res.status(200).json({
    response: _,
  })
}

export default async function getBooks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') await post(req, res)
  else return res.status(404).json({ error: 'ROUTE NOT VALID.' })
}
