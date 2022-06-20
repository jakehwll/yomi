import { Series } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteSeries, getSeries, updateSeries } from 'util/series'

export interface SeriesResponse extends Series {
  _count: {
    [key: string]: number
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const response = await getSeries(id as string)
  res.status(200).json({
    data: response,
  })
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const data = req.body
  console.log(data)
  const response = await updateSeries(id as string, data)
  res.status(200).json({
    data: response,
  })
}

async function _delete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const response = await deleteSeries(id as string)
  res.status(200).json({
    data: response,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else if (req.method === 'PATCH') update(req, res)
  else if (req.method === 'DELETE') _delete(req, res)
  else res.status(404)
}
