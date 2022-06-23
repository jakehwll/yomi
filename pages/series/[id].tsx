import { Book } from '@prisma/client'
import { GridItem, GridWrapper } from 'components/grid'
import SeriesHeader from 'components/headings/SeriesHeader'
import Layout from 'components/layout'
import Meta from 'components/Meta'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from 'util/swr'

const BookGrid = ({ books }: { books: Array<Book> }) => {
  return (
    <>
      <GridWrapper>
        {books &&
          books.map((v: Book) => (
            <GridItem
              image={''}
              key={v.id}
              headline={v.title}
              link={`/book/${v.id}`}
            />
          ))}
        {!books && <h1>no volumes.</h1>}
      </GridWrapper>
    </>
  )
}

export const Series = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error, mutate } = useSWR(`/api/series/${id}`, fetcher)

  if (data && data.data)
    return (
      <>
        <Meta title={data.data.title} />
        <Layout>
          <SeriesHeader
            title={data.data.title}
            image={`/api/series/${id}/thumbnail`}
            volumes={data.data.books.length}
            id={id as string}
            mutate={mutate}
          />
          <BookGrid books={data.data.books} />
        </Layout>
      </>
    )
  else return <Layout>Loading...</Layout>
}

export default Series
