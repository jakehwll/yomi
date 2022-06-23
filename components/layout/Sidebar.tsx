import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { BookOpen, Home, User } from 'react-feather'
import styles from 'styles/layout/Sidebar.module.scss'

const _navigation = [
  {
    icon: <Home />,
    href: '/',
    title: 'Home',
    id: 'home',
  },
  {
    icon: <BookOpen />,
    href: '/media-management',
    title: 'Media Management',
    id: 'media-mangement',
  },
]

const UserAccount = () => {
  const { data: session } = useSession()

  if (session)
    return (
      <div className={styles.user}>
        <User />
        <span>{session.user?.email}</span>
      </div>
    )
  else return <></>
}

const Sidebar = () => {
  return (
    <aside className={styles.root}>
      <nav className={styles.header}>
        <Link href="/" passHref>
          <a className={styles.brand}>yomi</a>
        </Link>
        <ul className={styles.navigation}>
          {_navigation.map(
            (v: {
              icon: React.ReactNode
              id: string
              href: string
              title: string
            }) => (
              <li key={v.id}>
                <Link href={v.href}>
                  <a>
                    {v.icon}
                    <span>{v.title}</span>
                  </a>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
      <UserAccount />
    </aside>
  )
}

export default Sidebar
