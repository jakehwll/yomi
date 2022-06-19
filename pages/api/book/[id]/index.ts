import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'util/prisma'

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const data = await prisma.book.findFirst({
    where: {
      id: {
        equals: id as string,
      },
    },
    include: {
      Series: true,
    },
  })

  res.status(200).json({
    id: id,
    data: data,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  // else if (req.method === 'POST') TODO. Update.
  else res.status(404)
}
