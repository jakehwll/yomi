import Content from 'components/layout/Content'
import Footer from 'components/layout/Footer'
import SearchInput from 'components/layout/Search'
import Sidebar from 'components/layout/Sidebar'
import type { NextPage } from 'next'
import styles from 'styles/layout/Layout.module.scss'

const Search: NextPage = () => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <Content>
        <div>
          <SearchInput />
          <h1>Search coming soon.</h1>
        </div>
        <Footer />
      </Content>
    </div>
  )
}

export default Search
