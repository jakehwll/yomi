import { NextApiRequest, NextApiResponse } from 'next'
import { getDirectoryFolders } from 'util/fs'
import prisma from 'util/prisma'
import { getSeries } from 'util/series'
import { getAuthorisedUser } from 'util/users'

async function get(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedUser(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  // gather the id from the request
  const { id } = req.query
  const series = await getSeries(id as string)
  const seriesDirectoriesList = (
    await prisma.book.findMany({
      where: {
        seriesId: {
          equals: id as string,
        },
      },
    })
  ).map((v) => v.folder)
  if (series) {
    const response = (
      await getDirectoryFolders({
        path: `${series.folder}`,
        depth: 1,
      })
    ).map((v) => `/${v.name}`)
    res.status(200).json({
      collection: 'series',
      data: response
        .filter((v) => !seriesDirectoriesList.includes(v))
        .sort((a, b) => a.localeCompare(b, 'en', { numeric: true })),
    })
  } else {
    res.status(404).json({
      error: 'Resource not found.',
      code: 400,
    })
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
