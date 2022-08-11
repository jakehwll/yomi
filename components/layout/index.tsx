import cc from 'classcat'
import { useState } from 'react'
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
  const [mobileNavigation, setMobileNavigation] = useState(false)

  return (
    <div className={styles.root}>
      <Sidebar
        mobileNavigation={mobileNavigation}
        setMobileNavigation={setMobileNavigation}
      />
      <Content>
        <section>
          {header && (
            <Header
              mobileNavigation={mobileNavigation}
              setMobileNavigation={setMobileNavigation}
            />
          )}
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
