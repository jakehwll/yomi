import { Menu } from 'lucide-react'
import styles from 'styles/layout/Layout.module.scss'
import FauxSearch from './FauxSearch'

const MobileMenu = () => {
  return (
    <button type="button" className={styles.mobile}>
      <Menu size={32} />
    </button>
  )
}

interface HeaderProps {
  Search?: any
  search?: string
  setSearch?(val: string): void
}

const Header: React.FC<HeaderProps> = ({
  Search,
  search,
  setSearch,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <MobileMenu />
      {Search ? (
        <Search search={search} setSearch={setSearch} />
      ) : (
        <FauxSearch />
      )}
    </header>
  )
}

export default Header
