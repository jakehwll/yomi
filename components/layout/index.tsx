import cc from 'classcat'
import styles from 'styles/layout/Layout.module.scss'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
  padding?: boolean
  header?: boolean
}

interface HeaderProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({
  children,
  padding = true,
  header = true,
}: LayoutProps) => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <Content>
        <section>
          {header && <Header />}
          <div
            className={cc({
              [styles.padding]: padding,
            })}
          >
            {children}
          </div>
        </section>
        <Footer />
      </Content>
    </div>
  )
}

export default Layout
