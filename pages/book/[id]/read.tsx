import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from 'styles/Reader.module.scss'

const Reader = () => {
  const router = useRouter()
  const { id } = router.query

  // constants
  const [index, setIndex] = useState(0)
  const [pageAmount, setPageAmount] = useState(1)
  const [render, setRender] = useState<Array<string>>([])
  const [keyDown, setKeydown] = useState('')

  // controls
  const [invert, setInvert] = useState(false)

  const _prev = () => {
    setIndex(index - 1)
  }
  const _next = () => {
    setIndex(index + 1)
  }

  useEffect(() => {
    setRender([`/api/book/${id}/page/${index}`])
  }, [index])

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.back}>
          <button type="button" onClick={() => router.push(`/book/${id}`)}>
            &larr;
          </button>
        </div>
        <div className={styles.title}>Book Title</div>
        <div className={styles.tools}>
          {/* <div>Fullscreen</div> */}
          {/* <div>Settings</div> */}
          {/* <div>Download</div> */}
        </div>
      </header>
      <section>
        <div className={styles.canvas}>
          {render.map((v: string, i: number) => {
            return (
              <div className={styles.page} key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v} alt="" />
              </div>
            )
          })}
        </div>
      </section>
      <footer className={styles.footer}>
        {index}
        <button type="button" onClick={_prev}>
          -
        </button>
        <button type="button" onClick={_next}>
          +
        </button>
      </footer>
    </div>
  )
}

export default Reader
