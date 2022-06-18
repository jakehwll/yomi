import { Series } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'util/prisma'

export interface SeriesResponse extends Series {
  _count: {
    [key: string]: number
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
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

async function post(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return
  const _ = await prisma.series.create({
    data: JSON.parse(req.body),
  })
  res.status(200).json({
    response: _,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') await get(req, res)
  else if (req.method === 'POST') await post(req, res)
  else return res.status(404)
}
