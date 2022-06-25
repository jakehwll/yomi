import { readFileSync } from 'fs'
import { globby } from 'globby'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSeries } from 'util/series'
import { getAuthorisedAdmin, getAuthorisedUser } from 'util/users'

async function get(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedUser(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  const {
    query: { list },
  } = req
  if (list === '') getFiles(req, res)
  else getThumbnailFile(req, res)
}

async function getThumbnailFile(req: NextApiRequest, res: NextApiResponse) {
  // gather the id from the request
  const { id } = req.query
  const data: any = await getSeries(id as string)
  const filePath = `${data.folder}${data.thumbnail}`
  try {
    const imageBuffer = readFileSync(`${filePath}`)
    res.setHeader('Content-Type', 'image/jpg')
    res.status(200).send(imageBuffer)
  } catch {}
}

async function getFiles(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedAdmin(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  // gather the id from the request
  const { id } = req.query
  const data: any = await getSeries(id as string)
  const files = (
    await globby(`${process.cwd()}${data.folder}/**/*.jpg`, {
      onlyFiles: true,
      objectMode: true,
    })
  ).map((v: any) => {
    // get our path and file.
    let path = v.path
    // remove the process and wrapping folder
    path = path.replaceAll(process.cwd(), '')
    path = path.replaceAll(data.folder, '')
    return path
  })
  res.status(200).json({
    data: files,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
