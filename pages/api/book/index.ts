import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'util/prisma'

async function post(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return
  const data = JSON.parse(req.body)
  const response = await prisma.book.create({
    data: data,
  })
  res.status(200).json({
    data: response,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') await post(req, res)
  else return res.status(404).json({ error: 'ROUTE NOT VALID.' })
}
