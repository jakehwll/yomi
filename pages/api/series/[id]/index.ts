import { Series } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteSeries, getSeries, updateSeries } from 'util/series'
import { getAuthorisedAdmin } from 'util/users'

export interface SeriesResponse extends Series {
  _count: {
    [key: string]: number
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  // gather the id from the request
  const { id } = req.query
  const response = await getSeries(id as string)
  res.status(200).json({
    data: response,
  })
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedAdmin(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  // gather the id from the request
  const { id } = req.query
  const data = req.body
  const response = await updateSeries(id as string, data)
  res.status(200).json({
    data: response,
  })
}

async function _delete(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedAdmin(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  // gather the id from the request
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
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
