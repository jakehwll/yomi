import { readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { getBook } from 'util/book'

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const data: any = getBook(id as string)
  const fileURI = `${data.folder}${data.thumbnail}`
  const filePath = path.join(process.cwd(), fileURI)
  try {
    const imageBuffer = readFileSync(filePath)
    res.setHeader('Content-Type', 'image/jpg')
    res.status(200).send(imageBuffer)
  } catch {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
