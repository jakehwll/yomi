import { Book } from '@prisma/client'
import { globby } from 'globby'
import { isContainerised } from './environment'
import { getDirectoryFilesProps } from './fs'
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
    .map((v: Book) => v.id)
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
    .map((v: Book) => v.id)
  const bookIndex = books.indexOf(id ? id.toString() : '')
  const prevVolumeIndex = bookIndex !== undefined ? bookIndex - 1 : undefined
  if (prevVolumeIndex === undefined) return undefined
  if (books && prevVolumeIndex < 0) return undefined
  return books[prevVolumeIndex]
}

/**
 *
 */
const guessBookThumbnail = async ({
  seriesId,
  folder,
}: {
  seriesId: string
  folder: string
}) => {
  const series = await prisma.series.findFirst({
    where: {
      id: seriesId,
    },
  })
  const filePath =
    `${!isContainerised ? process.cwd() : ''}` +
    `${series?.folder}${folder}/**/*.{jpg,jpeg,png}`
  const files = await globby(filePath, {
    onlyFiles: true,
    objectMode: true,
  })
  if (!series) return undefined
  const filesPaths = files.map((v: getDirectoryFilesProps) =>
    v.path
      .replaceAll(process.cwd(), '')
      .replaceAll(series?.folder, '')
      .replaceAll(folder, '')
  )
  const filesSelect = {
    cover: filesPaths.filter((v: string) => v.includes('[Cover]'))[0],
    p000: filesPaths.filter((v: string) => v.includes('p000'))[0],
    p001: filesPaths.filter((v: string) => v.includes('p001'))[0],
    _000: filesPaths.filter((v: string) => v.includes('_000'))[0],
    _001: filesPaths.filter((v: string) => v.includes('_001'))[0],
    first: filesPaths.filter((v: string) => v)[0],
  }
  if (filesSelect.cover) return filesSelect.cover
  else if (filesSelect.p000) return filesSelect.p000
  else if (filesSelect.p001) return filesSelect.p001
  else if (filesSelect._000) return filesSelect._000
  else if (filesSelect._001) return filesSelect._001
  else return filesSelect.first
}

export { getBook, updateBook, nextVolume, prevVolume, guessBookThumbnail }
