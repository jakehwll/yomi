import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default async function getImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = path.resolve('.', 'data.file')
  const imageBuffer = fs.readFileSync(filePath)
  res.setHeader('Content-Type', 'image/jpg')
  res.send(imageBuffer)
}
