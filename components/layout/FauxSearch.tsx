import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import styles from 'styles/layout/Search.module.scss'

const SearchInput: React.FC = () => {
  const router = useRouter()
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!input.current) return
    if (router.pathname === '/search') input.current.focus()
  }, [input])

  return (
    <div className={styles.root}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search"
        ref={input}
        onFocus={() => router.push({ pathname: '/search' })}
      />
    </div>
  )
}

export default SearchInput
