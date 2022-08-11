import { Menu } from 'lucide-react'
import styles from 'styles/layout/Layout.module.scss'
import FauxSearch from './FauxSearch'

const MobileMenu = ({ onClick }: { onClick(): void }) => {
  return (
    <button type="button" onClick={() => onClick()} className={styles.mobile}>
      <Menu size={24} />
    </button>
  )
}

interface HeaderProps {
  Search?: any
  search?: string
  setSearch?(val: string): void
  mobileNavigation: boolean
  setMobileNavigation(val: boolean): void
}

const Header: React.FC<HeaderProps> = ({
  Search,
  search,
  setSearch,
  mobileNavigation,
  setMobileNavigation,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <MobileMenu onClick={() => setMobileNavigation(!mobileNavigation)} />
      {Search ? (
        <Search search={search} setSearch={setSearch} />
      ) : (
        <FauxSearch />
      )}
    </header>
  )
}

export default Header
