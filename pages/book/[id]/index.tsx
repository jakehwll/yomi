import Layout from 'components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Book = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout>
      <Link href={`/book/${id}/read`} passHref>
        <a>Read book</a>
      </Link>
    </Layout>
  )
}

export default Book
