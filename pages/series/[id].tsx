import { Book } from '@prisma/client'
import { GridItem, GridWrapper } from 'components/grid'
import Layout from 'components/Layout'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const BookGrid = ({ seriesId }: { seriesId: string }) => {
  const { data, error } = useSWR(`/api/book/${seriesId}`, fetcher)
  if (data)
    return (
      <GridWrapper>
        {data.data &&
          data.data.map((v: Book) => (
            <GridItem key={v.id} headline={v.title} link={`/book/${v.id}`} />
          ))}
        {!data.data && <span>no books.</span>}
      </GridWrapper>
    )
  if (!data) return <span>loading...</span>
  if (error) return <span>Something went wrong.</span>
  return <span>...</span>
}

export const Series = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout>
      <BookGrid seriesId={id?.toString() ?? ''} />
    </Layout>
  )
}

export default Series
