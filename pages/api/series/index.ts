import { Series } from '@prisma/client'
import { orderBy } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'util/prisma'
import { getAllSeries } from 'util/series'
import { getAuthorisedAdmin, getAuthorisedUser } from 'util/users'

export interface SeriesResponse extends Series {
  _count: {
    [key: string]: number
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedUser(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  const response = orderBy(
    await getAllSeries(),
    [(series) => series.title.toLowerCase()],
    ['asc']
  )
  res.status(200).json({
    collection: 'series',
    data: response,
  })
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedAdmin(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  if (!req.body)
    return res
      .status(400)
      .json({ error: 'Malformed or empty body. Is it JSON?', code: 400 })
  const response = await prisma.series.create({
    data: req.body,
  })
  res.status(201).json({
    collection: 'series',
    data: response,
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
