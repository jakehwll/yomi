import prisma from './prisma'

const getBook = async (bookId: string) => {
  return await prisma.book.findFirst({
    where: {
      id: {
        equals: bookId,
      },
    },
  })
}

export { getBook }
