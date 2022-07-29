import { GridWrapper } from 'components/grid'
import GridItem, { GridItemGhost } from 'components/grid/GridItem'
import Loading from 'components/grid/Loading'
import Layout from 'components/layout'
import Meta from 'components/Meta'
import { range } from 'lodash'
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
        {range(0, 12).map((v: number) => {
          return <GridItemGhost key={v} />
        })}
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
      <Meta title={'Browse'} />
      <Layout>
        <SeriesGrid />
      </Layout>
    </>
  )
}

export default Home
