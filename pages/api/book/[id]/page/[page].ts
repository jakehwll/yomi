import { readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { getBook } from 'util/book'
import { getDirectoryFiles } from 'util/fs'

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id, page } = req.query
  const book = await getBook(id.toString())

  if (!book) {
    res.status(404).send({})
    return
  }

  const files = await getDirectoryFiles(book.folder)

  const fileURI = files[parseInt((page as string) ?? '')]
  const filePath = path.join(process.cwd(), fileURI)
  const imageBuffer = readFileSync(filePath)

  res.setHeader('Content-Type', 'image/jpg')
  res.status(200).send(imageBuffer)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404)
}
