import { readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import { getBook, getFilesData } from 'util/book'
import { getDirectoryFiles } from 'util/fs'
import { getAuthorisedUser } from 'util/users'

interface PageMetadataProps {
  metadata: {
    name: string
    path: string
  }
  series?: {
    index: number
    total: number
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedUser(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  // gather the id from the request
  const { id, page } = req.query
  // gather the book data from the request.
  const book = await getBook(id ? id.toString() : '')
  // 404 if we don't have the book on file.
  if (!book || !book.Series) {
    res.status(404).send({
      error: 'Request object not found.',
      code: 404,
    })
    return
  }
  // gather all files from the book.
  let files = await getDirectoryFiles({
    path: `${book.Series.folder}${book.folder}`,
  })
  if (files.length === 0)
    res.status(500).send({
      error: 'Request directory is empty or not found.',
      code: 500,
    })
  // map all our files and detect their titles.
  let filesData = getFilesData({ files: files })
  // check we have a page.
  if (!page) return
  // alright. now that we have our data, let's create the buffer!
  const fileMeta = filesData[
    parseInt(page.toString() ?? '')
  ] as PageMetadataProps
  const fileURI = fileMeta?.metadata.path
  let imageBuffer
  try {
    imageBuffer = readFileSync(fileURI ?? '')
  } catch {
    res.status(404).send({
      error: 'Request object not found.',
      code: 404,
    })
    return res.end()
  }
  // lets see if we have a series to manipulate.
  if (fileMeta.series) {
    // pull the width and height, and divide the width by how many slices we need.
    const { width, height } = await sharp(imageBuffer).metadata()
    const sliceWidth = Math.floor((width ?? 0) / fileMeta.series.total)
    // return an image buffer with the cropped image.
    const newImageBuffer = await sharp(imageBuffer)
      .extract({
        left: sliceWidth * fileMeta.series.index,
        top: 0,
        width: sliceWidth,
        height: height ?? 0,
      })
      .toBuffer()
    // we should have our buffer by now, lets serve him!
    res.setHeader('Content-Type', 'image/jpg')
    res.setHeader('cache-control', 'max-age=120')
    res.status(200).send(newImageBuffer)
    return res.end()
  } else {
    // we should have our buffer by now, lets serve him!
    res.setHeader('Content-Type', 'image/jpg')
    res.status(200).send(await sharp(imageBuffer).toBuffer())
    return res.end()
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
