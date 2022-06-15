import { GridItem, GridWrapper } from 'components/grid'
import Layout from 'components/Layout'
import type { NextPage } from 'next'
import useSWR from 'swr'
import { SeriesResponse } from './api/series'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const SeriesGrid = () => {
  const { data, error } = useSWR('/api/series', fetcher)
  if (data)
    return (
      <GridWrapper>
        {data.data.map((v: SeriesResponse) => (
          <GridItem
            key={v.id}
            headline={v.title}
            subline={`${v._count.books.toString() ?? ''} Books`}
            link={`/series/${v.id}`}
          />
        ))}
      </GridWrapper>
    )
  if (!data) return <span>loading...</span>
  if (error) return <span>Something went wrong.</span>
  return <span>...</span>
}

const Home: NextPage = () => {
  return (
    <Layout>
      <SeriesGrid />
    </Layout>
  )
}

export default Home
