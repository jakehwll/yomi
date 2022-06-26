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

export { getAllSeries, getSeries, deleteSeries, updateSeries }
