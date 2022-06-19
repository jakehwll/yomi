import { Series } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'util/prisma'

export interface SeriesResponse extends Series {
  _count: {
    [key: string]: number
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const data = await prisma.series.findFirst({
    where: {
      id: {
        equals: req.query.id as string,
      },
    },
    include: {
      books: true,
    },
  })

  res.status(200).json({
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
