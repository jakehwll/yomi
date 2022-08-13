import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'util/prisma'

async function post(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body
  const response = await prisma.series.findMany({
    where: {
      title: {
        contains: data.query,
      },
    },
    include: {
      _count: {
        select: { books: true },
      },
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
  if (req.method === 'POST') post(req, res)
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
