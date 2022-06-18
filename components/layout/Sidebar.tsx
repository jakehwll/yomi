import Link from 'next/link'
import styles from 'styles/layout/Sidebar.module.scss'

const _navigation = [
  {
    href: '/',
    title: 'Home',
    id: 'home',
  },
  {
    href: '/media-management',
    title: 'Media Management',
    id: 'media-mangement',
  },
]

const Sidebar = () => {
  return (
    <nav className={styles.root}>
      <Link href="/" passHref>
        <a className={styles.brand}>読み</a>
      </Link>
      <ul className={styles.navigation}>
        {_navigation.map((v: { id: string; href: string; title: string }) => (
          <li key={v.id}>
            <Link href={v.href}>
              <a>{v.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
