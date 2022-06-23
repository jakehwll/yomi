import { GridWrapper } from 'components/grid'
import GridItem, { GridItemGhost } from 'components/grid/GridItem'
import Layout from 'components/layout'
import Loading from 'components/Loading'
import Meta from 'components/Meta'
import RequiresAuth from 'components/RequiresAuth'
import type { NextPage } from 'next'
import useSWR from 'swr'
import fetcher from 'util/swr'
import { SeriesResponse } from './api/series'

const SeriesGrid = () => {
  const { data, error } = useSWR('/api/series', fetcher)

  if (error) return <span>Something went wrong.</span>
  if (!data)
    return (
      <GridWrapper>
        <GridItemGhost />
        <GridItemGhost />
        <GridItemGhost />
        <GridItemGhost />
        <GridItemGhost />
        <GridItemGhost />
        <GridItemGhost />
        <GridItemGhost />
        <GridItemGhost />
        <GridItemGhost />
      </GridWrapper>
    )
  if (data) if (!data.data) return <h1>No series found.</h1>
  if (data.data)
    return (
      <GridWrapper>
        {data.data.map((v: SeriesResponse) => (
          <GridItem
            key={v.id}
            image={v.thumbnail ? `/api/series/${v.id}/thumbnail` : undefined}
            headline={v.title}
            subline={`${v._count.books.toString() ?? ''} Volumes`}
            link={`/series/${v.id}`}
          />
        ))}
      </GridWrapper>
    )
  return <Loading />
}

const Home: NextPage = () => {
  return (
    <>
      <Meta title={'Books'} />
      <RequiresAuth />
      <Layout>
        <SeriesGrid />
      </Layout>
    </>
  )
}

export default Home
