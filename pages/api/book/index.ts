import { NextApiRequest, NextApiResponse } from 'next'
import { guessBookThumbnail } from 'util/book'
import prisma from 'util/prisma'

async function post(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return
  const data = req.body
  const response = await prisma.book.create({
    data: {
      ...data,
      thumbnail: await guessBookThumbnail({
        seriesId: data.seriesId,
        folder: data.folder,
      }),
    },
  })
  res.status(200).json({
    collection: 'book',
    data: response,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') await post(req, res)
  else
    return res
      .status(404)
      .json({ error: 'Invalid route for method.', code: 404 })
}
