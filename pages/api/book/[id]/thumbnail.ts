import { readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getBook } from 'util/book'
import { getDirectoryFiles } from 'util/fs'
import prisma from 'util/prisma'
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
  const data: any = await getBook(id as string)
  const fileURI = `${data.Series.folder}${data.folder}/${data.thumbnail}`
  try {
    const imageBuffer = readFileSync(`${process.cwd()}${fileURI}`)
    res.setHeader('Content-Type', 'image/jpg')
    res.status(200).send(imageBuffer)
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
  const data: any = await getBook(id as string)
  const files = (
    await getDirectoryFiles({ path: `${data.Series.folder}${data.folder}` })
  ).map((v: any) => {
    // get our path and file.
    let path = v.path
    // remove the process and wrapping folder
    path = path.replaceAll(process.cwd(), '')
    path = path.replace(data.folder, '')
    path = path.replaceAll(data.Series.folder, '')
    return path
  })
  res.status(200).json({
    collection: 'book',
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
  const response = await prisma.book.update({
    where: {
      id: id.toString(),
    },
    data: data,
  })
  res.status(200).json({
    collection: 'book',
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
