import prisma from './prisma'

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

const updateSeries = async (seriesId: string, data: object) => {
  return await prisma.series.update({
    where: {
      id: seriesId,
    },
    data: data,
  })
}

const deleteSeries = async (seriesId: string) => {
  return await prisma.series.delete({
    where: {
      id: seriesId,
    },
  })
}

export { getAllSeries, getSeries, deleteSeries, updateSeries }
