import Layout from 'components/layout'
import Meta from 'components/Meta'
import RequiresAuth from 'components/RequiresAuth'
import type { NextPage } from 'next'

const ErrorMessage = () => {
  return (
    <Layout>
      <h1>Error.</h1>
    </Layout>
  )
}

const ErrorPage: NextPage = () => {
  return (
    <>
      <Meta title={'Error'} />
      <RequiresAuth />
      <ErrorMessage />
    </>
  )
}

export default ErrorPage
export { ErrorMessage }
