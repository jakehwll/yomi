import cc from 'classcat'
import styles from 'styles/layout/Layout.module.scss'
import Content from './layout/Content'
import Footer from './layout/Footer'
import Sidebar from './layout/Sidebar'
import Search from './Search'

const Layout = ({
  children,
  padding = true,
}: {
  children: React.ReactNode
  padding?: boolean
}) => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <Content>
        <div>
          <Search />
          <div
            className={cc({
              [styles.padding]: padding,
            })}
          >
            {children}
          </div>
        </div>
        <Footer />
      </Content>
    </div>
  )
}

export default Layout
