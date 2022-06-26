import Head from 'next/head'

interface MetaProps {
  title: string
}

const Meta: React.FC<MetaProps> = ({ title }: MetaProps) => {
  return (
    <Head>
      <title>{`${title} - yomi`}</title>
    </Head>
  )
}

export default Meta
