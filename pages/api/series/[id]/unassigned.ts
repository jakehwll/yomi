import { readdirSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { getSeries } from 'util/series'

const getFiles = async (location: string) => {
  return readdirSync(path.join(process.cwd(), location), {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map((v: any) => {
      return `${location}/${v.name}`
    })
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const series = await getSeries(id as string)

  if (id === 'undefined') {
    res.status(200).json({ data: [] })
    return
  }

  const directoriesList = await getFiles((series as any).folder)
  res.status(200).json({
    data: directoriesList,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404)
}
