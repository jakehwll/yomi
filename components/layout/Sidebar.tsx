import { BookOpen, Home, User } from 'lucide-react'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styles from 'styles/layout/Sidebar.module.scss'

interface UserAccountProps {
  session: Session
}

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

const UserAccount: React.FC<UserAccountProps> = ({
  session,
}: UserAccountProps) => {
  return (
    <div className={styles.user}>
      <User />
      <span>{session.user?.email}</span>
      <Link href="/settings/user" passHref>
        <a></a>
      </Link>
    </div>
  )
}

const Sidebar: React.FC = () => {
  const { data: session } = useSession()

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
      {session && <UserAccount session={session} />}
    </aside>
  )
}

export default Sidebar
