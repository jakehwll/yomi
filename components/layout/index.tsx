import cc from 'classcat'
import { Menu } from 'lucide-react'
import styles from 'styles/layout/Layout.module.scss'
import Content from './Content'
import Footer from './Footer'
import Search from './Search'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
  padding?: boolean
}

interface HeaderProps {
  children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }: HeaderProps) => {
  return <header>{children}</header>
}

const MobileMenu = () => {
  return (
    <button type="button" className={styles.mobile}>
      <Menu size={32} />
    </button>
  )
}

const Layout: React.FC<LayoutProps> = ({
  children,
  padding = true,
}: LayoutProps) => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <Content>
        <section>
          <header className={styles.header}>
            <MobileMenu />
            <Search />
          </header>
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
