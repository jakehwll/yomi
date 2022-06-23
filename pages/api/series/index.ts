import { Series } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma, { tryCatch } from 'util/prisma'
import { getAllSeries } from 'util/series'

export interface SeriesResponse extends Series {
  _count: {
    [key: string]: number
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const response = await getAllSeries()
  res.status(200).json({
    data: response,
  })
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body)
    return res
      .status(400)
      .json({ error: 'Malformed or empty body. Is it JSON?', code: 400 })
  tryCatch(res, async () => {
    const response = await prisma.series.create({
      data: req.body,
    })
    res.status(201).json({
      data: response,
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') await get(req, res)
  else if (req.method === 'POST') await post(req, res)
  else
    return res
      .status(404)
      .json({ error: 'Invalid method for route.', code: 404 })
}
