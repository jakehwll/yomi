import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import prisma from 'util/prisma'

export default async function getThumbnail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const data: any = await prisma.series.findFirst({
    where: {
      id: {
        equals: id as string,
      },
    },
  })
  const fileURI = `${data.folder}${data.thumbnail}`
  const filePath = path.join(process.cwd(), fileURI)

  try {
    const imageBuffer = fs.readFileSync(filePath)
    res.setHeader('Content-Type', 'image/jpg')
    res.send(imageBuffer)
  } catch (error: any) {
    if (error.code === 'ENOENT')
      res.send({ error: { message: 'Image file not found.', value: fileURI } })
    else res.send({ error: { message: 'Unknown error.', value: error } })
  }
}
