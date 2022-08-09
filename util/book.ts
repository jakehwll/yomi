import { Book } from '@prisma/client'
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

/**
 *
 */
const nextVolume = async (id: string) => {
  const book = await prisma.book.findFirst({
    where: {
      id: id ? id.toString() : '',
    },
    include: {
      Series: true,
    },
  })
  if (!book) return undefined
  const series = await prisma.series.findFirst({
    where: {
      id: book?.Series?.id,
    },
    include: {
      books: true,
    },
  })
  if (!series || !series.books) return undefined
  const books = series.books
    .sort((a, b) => a.title.localeCompare(b.title, 'en', { numeric: true }))
    .map((v: Book) => {
      return v.id
    })
  const bookIndex = books.indexOf(id ? id.toString() : '')
  const nextVolumeIndex = bookIndex !== undefined ? bookIndex + 1 : undefined
  if (nextVolumeIndex === undefined) return undefined
  if (books && nextVolumeIndex > books?.length - 1) return undefined
  return books[nextVolumeIndex]
}

/**
 *
 */
const prevVolume = async (id: string) => {
  const book = await prisma.book.findFirst({
    where: {
      id: id ? id.toString() : '',
    },
    include: {
      Series: true,
    },
  })
  if (!book) return undefined
  const series = await prisma.series.findFirst({
    where: {
      id: book?.Series?.id,
    },
    include: {
      books: true,
    },
  })
  if (!series || !series.books) return undefined
  const books = series.books
    .sort((a, b) => a.title.localeCompare(b.title, 'en', { numeric: true }))
    .map((v: Book) => {
      return v.id
    })
  const bookIndex = books.indexOf(id ? id.toString() : '')
  const prevVolumeIndex = bookIndex !== undefined ? bookIndex - 1 : undefined
  if (prevVolumeIndex === undefined) return undefined
  if (books && prevVolumeIndex < 0) return undefined
  return books[prevVolumeIndex]
}

export { getBook, updateBook, nextVolume, prevVolume }
