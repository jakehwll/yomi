import { Book } from '@prisma/client'
import { GridItem, GridWrapper } from 'components/grid'
import SeriesHeader from 'components/headings/SeriesHeader'
import Layout from 'components/Layout'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from 'util/swr'

const BookGrid = ({ seriesId }: { seriesId: string }) => {
  const { data, error } = useSWR(`/api/book/${seriesId}`, fetcher)

  if (data)
    return (
      <>
        {data.data && (
          <GridWrapper>
            {data.data &&
              data.data.map((v: Book) => (
                <GridItem
                  image={''}
                  key={v.id}
                  headline={v.title}
                  link={`/book/${v.id}`}
                />
              ))}
            {data.data.length === 0 && <h1>no volumes.</h1>}
          </GridWrapper>
        )}
      </>
    )
  else if (error) {
    return <span>Something went wrong.</span>
  } else return <>Loading...</>
}

export const Series = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(`/api/series/${id}`, fetcher)

  if (data && data.data)
    return (
      <Layout>
        <SeriesHeader
          title={data.data.title}
          image={`/api/series/${id}/thumbnail`}
          volumes={0}
        />
        <BookGrid seriesId={id?.toString() ?? ''} />
      </Layout>
    )
  else return <Layout>Loading...</Layout>
}

export default Series
