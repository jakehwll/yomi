import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'util/prisma'

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const data = await prisma.book.findMany({
    where: {
      seriesId: {
        equals: id as string,
      },
    },
  })

  res.status(200).json({
    id: id,
    total: data.length,
    data: data,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404)
}
