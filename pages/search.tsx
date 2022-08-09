import { Series } from '@prisma/client'
import { GridWrapper } from 'components/grid'
import GridItem, { GridItemGhost } from 'components/grid/GridItem'
import Layout from 'components/layout'
import Header from 'components/layout/Header'
import Meta from 'components/Meta'
import { range } from 'lodash'
import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import styles from 'styles/layout/Search.module.scss'
import useSWR from 'swr'
import { fetchPost } from 'util/swr'

interface SearchComponentProps {
  search: string
  setSearch(val: string): void
}

export const SearchComponent = ({
  search,
  setSearch,
}: SearchComponentProps) => {
  const root = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!root || !root.current) return
    root.current.focus()
  }, [root])

  return (
    <div className={styles.root}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        ref={root}
      />
    </div>
  )
}

export interface SeriesResponse extends Series {
  _count: {
    [key: string]: number
  }
}

const Search: NextPage = () => {
  const [query, setQuery] = useState('')
  const { data, error } = useSWR(
    [`/api/series/search`, JSON.stringify({ query: `${query}` })],
    fetchPost
  )

  return (
    <>
      <Meta title="Search" />
      <Layout padding={false} header={false}>
        <Header Search={SearchComponent} search={query} setSearch={setQuery} />
        {data && (
          <GridWrapper padding={true}>
            {data.data &&
              data.data.map((v: SeriesResponse) => (
                <GridItem
                  key={v.id}
                  image={
                    v.thumbnail ? `/api/series/${v.id}/thumbnail` : undefined
                  }
                  headline={v.title}
                  subline={`${v._count.books.toString() ?? ''} Volumes`}
                  link={`/series/${v.id}`}
                />
              ))}
          </GridWrapper>
        )}
        {error && (
          <GridWrapper padding={true}>
            {range(0, 20).map((v: number) => (
              <GridItemGhost key={v} />
            ))}
          </GridWrapper>
        )}
      </Layout>
    </>
  )
}

export default Search
