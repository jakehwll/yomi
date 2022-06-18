import { readdirSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { getAllSeries } from 'util/series'

const getDirectories = async (location: string) => {
  return readdirSync(path.join(process.cwd(), location), {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map((v: any) => {
      return `${location}/${v.name}`
    })
}

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const directoriesList = await getDirectories('/data')
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
