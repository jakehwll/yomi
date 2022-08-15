import cc from 'classcat'
import { Home, Library, Settings, User } from 'lucide-react'
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
    icon: <Library />,
    href: '/',
    title: 'Libraries',
    id: 'libraries',
    children: [
      {
        title: 'Manga (English)',
        id: 'manga',
      },
      {
        title: 'Manga (Japanese)',
        id: 'manga-jp',
      },
      {
        title: 'Light Novels',
        id: 'light-novels',
      },
      {
        title: 'Comics',
        id: 'comics',
      },
    ],
  },
]

const _subnavigation = [
  {
    icon: <Settings />,
    href: '/server-management',
    title: 'Settings',
    id: 'server-management',
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
              <img src="/logo.svg" alt="" />
            </a>
          </Link>
          <ul className={styles.navigation}>
            {_navigation.map(
              (v: {
                icon: React.ReactNode
                id: string
                href: string
                title: string
                children?: any
              }) => (
                <li key={v.id}>
                  <Link href={v.href}>
                    <a>
                      {v.icon}
                      <span>{v.title}</span>
                    </a>
                  </Link>
                  {v.children && (
                    <ul className={styles.children}>
                      {v.children.map((b: any) => {
                        return (
                          <li key={b.id}>
                            <Link href={`${v.href}/${b.id}`}>
                              <a>{b.title}</a>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            )}
          </ul>
        </nav>
        {session && (
          <div>
            <ul className={styles.navigation}>
              {_subnavigation.map(
                (v: {
                  icon: React.ReactNode
                  id: string
                  href: string
                  title: string
                  children?: any
                }) => (
                  <li key={v.id}>
                    <Link href={v.href}>
                      <a>
                        {v.icon}
                        <span>{v.title}</span>
                      </a>
                    </Link>
                    {v.children && (
                      <ul className={styles.children}>
                        {v.children.map((b: any) => {
                          return (
                            <li key={b.id}>
                              <Link href={`${v.href}/${b.id}`}>
                                <a>{b.title}</a>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              )}
            </ul>
            <UserAccount session={session} />
          </div>
        )}
      </aside>
    </>
  )
}

export default Sidebar
