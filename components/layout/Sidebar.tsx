import cc from 'classcat'
import { BookOpen, Home, User } from 'lucide-react'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import Image from 'next/future/image'
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

interface SidebarProps {
  mobileNavigation: boolean
  setMobileNavigation(val: boolean): void
}

const Sidebar: React.FC<SidebarProps> = ({
  mobileNavigation,
  setMobileNavigation,
}: SidebarProps) => {
  const { data: session } = useSession()

  return (
    <>
      {mobileNavigation && (
        <div
          className={styles.overlay}
          onClick={() => setMobileNavigation(false)}
        ></div>
      )}
      <aside
        className={cc([styles.root, { [styles.mobile]: mobileNavigation }])}
      >
        <nav className={styles.header}>
          <Link href="/" passHref>
            <a className={styles.brand}>
              <Image src="/logo.svg" alt="" />
            </a>
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
    </>
  )
}

export default Sidebar
