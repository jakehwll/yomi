import { Series } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'util/prisma'

export interface SeriesResponse extends Series {
  _count: {
    [key: string]: number
  }
}

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const data = await prisma.series.findFirst({
    where: {
      id: {
        equals: req.query.id as string,
      },
    },
  })

  res.status(200).json({
    data: data,
  })
}
