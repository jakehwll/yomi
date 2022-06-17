import { GridWrapper } from 'components/grid'
import GridItem, { GridItemGhost } from 'components/grid/GridItem'
import Layout from 'components/Layout'
import type { NextPage } from 'next'
import useSWR from 'swr'
import { SeriesResponse } from './api/series'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

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
            image={`/api/series/${v.id}/thumbnail`}
            headline={v.title}
            subline={`${v._count.books.toString() ?? ''} Volumes`}
            link={`/series/${v.id}`}
          />
        ))}
      </GridWrapper>
    )
  return <span>...</span>
}

const Home: NextPage = () => {
  return (
    <Layout padding={false}>
      <SeriesGrid />
    </Layout>
  )
}

export default Home
