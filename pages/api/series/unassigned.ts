import { NextApiRequest, NextApiResponse } from 'next'
import { getDirectoryFolders } from 'util/fs'
import { getAllSeries } from 'util/series'

async function get(req: NextApiRequest, res: NextApiResponse) {
  const directoriesList = await getDirectoryFolders('/data')
  const seriesDirectoriesList = await (
    await getAllSeries()
  ).map((v) => {
    return v.folder
  })

  res.status(200).json({
    data: directoriesList.filter((v) => {
      return !seriesDirectoriesList.includes(v)
    }),
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
