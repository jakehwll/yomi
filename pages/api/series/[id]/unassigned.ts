import { NextApiRequest, NextApiResponse } from 'next'
import { getDirectoryFolders } from 'util/fs'
import { getSeries } from 'util/series'

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const series = await getSeries(id as string)

  if (id === 'undefined') {
    res.status(200).json({ data: [] })
    return
  }

  const response = await getDirectoryFolders((series as any).folder)

  res.status(200).json({
    data: response,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
