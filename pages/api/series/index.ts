import { Series } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'util/prisma'

export interface SeriesResponse extends Series {
  _count: {
    [key: string]: number
  }
}

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const data = await prisma.series.findMany({
    include: {
      _count: {
        select: { books: true },
      },
    },
  })

  if (!data || data.length === 0) res.status(404).json({ error: 'not found' })
  else
    res.status(200).json({
      data: data,
    })
}
