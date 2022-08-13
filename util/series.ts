import { globby } from 'globby'
import { isContainerised } from './environment'
import { getDirectoryFilesProps } from './fs'
import prisma from './prisma'

/**
 * Scan the database for all available series.
 * @returns Found <Series /> object or null.
 */
const getAllSeries = async () => {
  return await prisma.series.findMany({
    include: {
      _count: {
        select: { books: true },
      },
      books: {
        include: {
          ReadProgress: true,
        },
      },
    },
    orderBy: {
      title: 'asc',
    },
  })
}

/**
 * Grab a series based on its seriesId value.
 * @param seriesId Given Series Id in the database
 * @returns Found <Series /> object or null.
 */
const getSeries = async (seriesId: string) => {
  return await prisma.series.findFirst({
    where: {
      id: {
        equals: seriesId,
      },
    },
    include: {
      books: {
        orderBy: {
          title: 'asc',
        },
      },
    },
  })
}

/**
 * Update a book based on its bookId value.
 * @param seriesId Given Series Id in the database.
 * @param data New data to insert into the database.
 * @returns Found <Series /> object or null.
 */
const updateSeries = async (seriesId: string, data: object) => {
  return await prisma.series.update({
    where: {
      id: seriesId,
    },
    data: data,
  })
}

/**
 * Remove a series based on its bookId value.
 * @param seriesId Given Series Id in the database.
 * @returns Found <Series /> object or null.
 */
const deleteSeries = async (seriesId: string) => {
  return await prisma.series.delete({
    where: {
      id: seriesId,
    },
  })
}

/**
 *
 */
const guessSeriesThumbnail = async ({ folder }: { folder: string }) => {
  const filePath = `${
    !isContainerised ? process.cwd() : ''
  }${folder}/**/*.{jpg,jpeg,png}`
  const files = await globby(filePath, {
    onlyFiles: true,
    objectMode: true,
  })
  const filesPaths = files.map((v: getDirectoryFilesProps) =>
    v.path.replaceAll(process.cwd(), '').replaceAll(folder, '')
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
  else if (filesSelect.first) return filesSelect.first
  return undefined
}

export {
  getAllSeries,
  getSeries,
  deleteSeries,
  updateSeries,
  guessSeriesThumbnail,
}
