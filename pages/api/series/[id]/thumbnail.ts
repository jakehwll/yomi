import { readFileSync } from 'fs'
import { globby } from 'globby'
import { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import { isContainerised } from 'util/environment'
import prisma from 'util/prisma'
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
  const fileURI = `${data.folder}${data.thumbnail}`
  try {
    const imageBuffer = readFileSync(
      `${!isContainerised ? process.cwd() : ''}${fileURI}`
    )
    res.setHeader('Content-Type', 'image/jpg')
    res.status(200).send(
      await sharp(imageBuffer)
        .resize({
          width: 768,
          height: 1152,
          fit: 'cover',
        })
        .jpeg({
          quality: 80,
        })
        .toBuffer()
    )
    return res.end()
  } catch {
    res.status(404).send({})
    return res.end()
  }
}

async function getFiles(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedAdmin(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  // gather the id from the request
  const { id } = req.query
  const data: any = await getSeries(id as string)
  const files = (
    await globby(
      `${!isContainerised ? process.cwd() : ''}${
        data.folder
      }/**/*.{jpeg,jpg,png}`,
      {
        onlyFiles: true,
        objectMode: true,
      }
    )
  )
    .map((v: any) => {
      // get our path and file.
      let path = v.path
      // remove the process and wrapping folder
      if (!isContainerised) path = path.replaceAll(process.cwd(), '')
      path = path.replaceAll(data.folder, '')
      return path
    })
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
  res.status(200).json({
    collection: 'series',
    data: files,
  })
  return res.end()
}

async function patch(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedAdmin(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  // gather the id and body from the request
  const { id } = req.query
  const data = req.body
  //
  const response = await prisma.series.update({
    where: {
      id: id ? id.toString() : '',
    },
    data: data,
  })
  res.status(200).json({
    collection: 'series',
    data: response,
  })
  return res.end()
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') await get(req, res)
  else if (req.method === 'PATCH') await patch(req, res)
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
