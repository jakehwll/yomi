import Link from 'next/link'
import styles from 'styles/layout/Sidebar.module.scss'

const Sidebar = () => {
  return (
    <nav className={styles.root}>
      <Link href="/" passHref>
        <a className={styles.brand}>yomi</a>
      </Link>
      <ul className={styles.navigation}>
        <li>Home</li>
      </ul>
    </nav>
  )
}

export default Sidebar
