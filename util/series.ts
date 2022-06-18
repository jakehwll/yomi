import prisma from './prisma'

const getAllSeries = async () => {
  return await prisma.series.findMany({
    include: {
      _count: {
        select: { books: true },
      },
    },
  })
}

const getSeries = async (seriesId: string) => {
  return await prisma.series.findFirst({
    where: {
      id: {
        equals: seriesId,
      },
    },
  })
}

export { getAllSeries, getSeries }
