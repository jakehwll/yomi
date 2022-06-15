import Content from './layout/Content'
import Footer from './layout/Footer'
import Sidebar from './layout/Sidebar'
import Search from './Search'

import styles from 'styles/pages/Layout.module.scss'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <Content>
        <div>
          <Search />
          {children}
        </div>
        <Footer />
      </Content>
    </div>
  )
}

export default Layout
