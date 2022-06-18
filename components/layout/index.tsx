import cc from 'classcat'
import styles from 'styles/layout/Layout.module.scss'
import Content from './Content'
import Footer from './Footer'
import Search from './Search'
import Sidebar from './Sidebar'

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
