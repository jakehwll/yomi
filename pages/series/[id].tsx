import { GridItem, GridWrapper } from 'components/grid'
import Layout from 'components/Layout'

export const Series = () => {
  return (
    <Layout>
      <GridWrapper>
        <GridItem
          title={'Example Book'}
          author={'Jane Doe'}
          link={'/book/test'}
        />
      </GridWrapper>
    </Layout>
  )
}

export default Series
