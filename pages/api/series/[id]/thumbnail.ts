import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import prisma from 'util/prisma'

async function get(req: NextApiRequest, res: NextApiResponse) {
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
    res.status(200).send(imageBuffer)
  } catch (error: any) {
    res.status(500).send({ error: { message: 'Unknown error.', value: error } })
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404)
}
