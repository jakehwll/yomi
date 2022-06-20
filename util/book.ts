import prisma from './prisma'

const getBook = async (bookId: string) => {
  return await prisma.book.findFirst({
    where: {
      id: {
        equals: bookId,
      },
    },
    include: {
      Series: true,
    },
  })
}

const createBook = async (data: object) => {
  return await prisma.book.create(data)
}

const updateBook = async (bookId: string, data: object) => {
  return await prisma.book.update({
    where: {
      id: bookId,
    },
    data: data,
  })
}

export { getBook, updateBook, createBook }
