import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import styles from 'styles/Search.module.scss'

const SearchInput = () => {
  const router = useRouter()
  const input = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState(router.query.query ?? '')

  useEffect(() => {
    if (!query) return
    router.push(
      {
        pathname: '/search',
        query: { query: query },
      },
      undefined,
      { shallow: false }
    )
  }, [query])

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
        value={query}
        ref={input}
        onFocus={() => router.push({ pathname: '/search' })}
        onChange={(event) => setQuery(event.target.value)}
      />
    </div>
  )
}

export default SearchInput
