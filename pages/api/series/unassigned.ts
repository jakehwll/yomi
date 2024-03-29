import { NextApiRequest, NextApiResponse } from 'next'
import { isContainerised } from 'util/environment'
import { getDirectoryFolders } from 'util/fs'
import { getAllSeries } from 'util/series'
import { getAuthorisedUser } from 'util/users'

async function get(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedUser(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  const directoriesList = (
    await getDirectoryFolders({ path: `/data/library`, depth: 1 })
  ).map((v) => {
    if (!isContainerised) return v.path.replaceAll(process.cwd(), '')
    else return v.path
  })
  const seriesDirectoriesList = (await getAllSeries()).map((v) => v.folder)
  res.status(200).json({
    collection: 'series',
    data: directoriesList
      .filter((v) => !seriesDirectoriesList.includes(v))
      .sort((a, b) => a.localeCompare(b, 'en', { numeric: true })),
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
