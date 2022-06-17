import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default async function getImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { id, page } = req.query
  // const data = await prisma.book.findMany({
  //   where: {
  //     seriesId: {
  //       equals: id as string,
  //     },
  //   },
  // })
  // if (!data || data.length === 0) res.status(404).json({ error: 'not found' })
  // else
  //   res.status(200).json({
  //     id: id,
  //     total: data.length,
  //     data: data,
  //   })
  const filePath = path.resolve('.', 'data.file')
  const imageBuffer = fs.readFileSync(filePath)
  res.setHeader('Content-Type', 'image/jpg')
  res.send(imageBuffer)
}
