import { Book } from '@prisma/client'
import { GridWrapper } from 'components/grid'
import GridItemBook from 'components/grid/GridItemBook'
import SeriesHeader from 'components/headings/SeriesHeader'
import Layout from 'components/layout'
import Meta from 'components/Meta'
import { useRouter } from 'next/router'
import { ErrorMessage } from 'pages/_error'
import useSWR from 'swr'
import fetcher from 'util/swr'

const BookGrid = ({
  books,
  mutate,
}: {
  books: Array<Book>
  mutate(): void
}) => {
  return (
    <>
      <GridWrapper>
        {books &&
          books.map((v: Book) => (
            <GridItemBook
              id={v.id}
              image={
                v.thumbnail ? `/api/book/${v.id}/thumbnail` : '/placeholder.jpg'
              }
              key={v.id}
              headline={v.title}
              link={`/book/${v.id}`}
              mutate={mutate}
              data={v}
            />
          ))}
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
      <Layout>
        {data && data.data && (
          <>
            <Meta title={data.data.title} />
            <SeriesHeader
              title={data.data.title}
              image={data.data.thumbnail && `/api/series/${id}/thumbnail`}
              volumes={data.data.books.length}
              id={id as string}
              mutate={mutate}
              data={data}
            />
            <BookGrid books={data.data.books} mutate={mutate} />
          </>
        )}
      </Layout>
    </>
  )
}

export default Series
