import { NextApiRequest, NextApiResponse } from 'next'
import prisma, { tryCatch } from 'util/prisma'

async function post(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return
  const data = req.body
  tryCatch(res, async () => {
    const response = await prisma.book.create({
      data: data,
    })
    res.status(201).json({
      data: response,
    })
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
