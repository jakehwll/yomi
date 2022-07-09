import prisma from './prisma'

export interface pageMetaData {
  metadata: {
    name: string
    path: string
  }
  series?: {
    index: number
    total: number
  }
}

/**
 * Grab a book based on its bookId value.
 * @param bookId Given Book's Id in the database.
 * @returns Found <Book /> object or null.
 */
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

/**
 * Update a book based on its bookId value.
 * @param bookId Given Book's Id in the database.
 * @param data New data to insert into the database.
 * @returns Found book object or null.
 */
const updateBook = async (bookId: string, data: Object) => {
  return await prisma.book.update({
    where: {
      id: bookId,
    },
    data: data,
  })
}

export { getBook, updateBook }
