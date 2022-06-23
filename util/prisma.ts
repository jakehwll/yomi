import { PrismaClient } from '@prisma/client'
import { NextApiResponse } from 'next'

const prisma = new PrismaClient()

var tryCatch = function (res: NextApiResponse, _function: Function) {
  return () => {
    try {
      _function()
    } catch (error) {
      res.status(500).json({
        error: 'Failed to create.',
        code: 500,
      })
    }
  }
}

export default prisma
export { tryCatch }
