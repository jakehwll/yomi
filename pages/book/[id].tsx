import Layout from 'components/Layout'
import Link from 'next/link'

export const Book = () => {
  return (
    <Layout>
      <Link href="/book/test/read" passHref>
        <a>Read book</a>
      </Link>
    </Layout>
  )
}

export default Book
