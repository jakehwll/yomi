import Head from 'next/head'

const Meta = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>{title} - yomi</title>
    </Head>
  )
}

export default Meta
