import { Book } from '@prisma/client'
import { GridItem, GridWrapper } from 'components/grid'
import SeriesHeader from 'components/headings/SeriesHeader'
import Layout from 'components/layout'
import Meta from 'components/Meta'
import RequiresAuth from 'components/RequiresAuth'
import { useRouter } from 'next/router'
import { ErrorMessage } from 'pages/_error'
import useSWR from 'swr'
import fetcher from 'util/swr'

const BookGrid = ({ books }: { books: Array<Book> }) => {
  return (
    <>
      <GridWrapper>
        {books &&
          books.map((v: Book) => (
            <GridItem
              image={v.thumbnail ? v.thumbnail : '/placeholder.jpg'}
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

  if (data && !data.data)
    return (
      <>
        <ErrorMessage />
      </>
    )

  return (
    <>
      <RequiresAuth />
      {data && (
        <Layout>
          {data.data && (
            <>
              <Meta title={data.data.title} />
              <SeriesHeader
                title={data.data.title}
                image={`/api/series/${id}/thumbnail`}
                volumes={data.data.books.length}
                id={id as string}
                mutate={mutate}
              />
              <BookGrid books={data.data.books} />
            </>
          )}
        </Layout>
      )}
    </>
  )
}

export default Series
