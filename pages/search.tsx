import Content from 'components/layout/Content'
import Footer from 'components/layout/Footer'
import Sidebar from 'components/layout/Sidebar'
import SearchInput from 'components/Search'
import type { NextPage } from 'next'
import styles from 'styles/pages/Layout.module.scss'

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
