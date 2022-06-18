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
    res.status(200).send(imageBuffer)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      res.setHeader('Content-Type', 'image/svg+xml')
      res.status(400)
        .send(`<svg width="600" height="900" viewBox="0 0 600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="900" fill="#303236"/>
          <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="36" font-weight="bold" letter-spacing="0em"><tspan x="0" y="463.091">Series Title</tspan></text>
          </svg>`)
    } else
      res
        .status(500)
        .send({ error: { message: 'Unknown error.', value: error } })
  }
}
