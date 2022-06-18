import cc from 'classcat'
import { range } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from 'styles/Reader.module.scss'

const Pages = ({ render }: { render: Array<string> }) => {
  return (
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
  )
}

const Reader = () => {
  const router = useRouter()
  const { id } = router.query

  // constants
  const [index, setIndex] = useState(0)
  const [pageAmount, setPageAmount] = useState(2)
  const [controls, setControls] = useState(true)
  const [render, setRender] = useState<Array<string>>([])

  // controls
  const [invert, setInvert] = useState(true)

  const _prev = (pageNum: number) => {
    // dont allow to page out of bounds.
    if (pageNum - 1 < 0) return 0
    // add one to our page number to decrement.
    return pageNum - 1
  }
  const _next = (pageNum: number) => {
    // TODO dont allow to page out of bounds.
    if (pageNum - -1 < 0) return -1
    // add one to our page number to increment.
    return pageNum + 1
  }

  useEffect(() => {
    if (id === undefined) return setRender([])
    // only render the front-cover.
    if (index === 0) return setRender([`/api/book/${id}/page/0`])
    // TODO only render the back-cover.
    if (index === -1) return setRender([`/api/book/${id}/page/${-1}`])
    // loop all pages for our pageAmount range and render them
    let pages = range(index * pageAmount, index * pageAmount + pageAmount).map(
      (v: number) => `/api/book/${id}/page/${v}`
    )
    // reverse if inverted layout (manga).
    if (invert) pages = pages.reverse()
    // update the renderer.
    setRender(pages)
  }, [id, index])

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      console.log(event.key)
      if (event.key === 'ArrowRight')
        setIndex((pageNum) => (invert ? _prev(pageNum) : _next(pageNum)))
      if (event.key === 'ArrowLeft')
        setIndex((pageNum) => (invert ? _next(pageNum) : _prev(pageNum)))
      if (event.key === ' ') setControls((controls) => !controls)
      if (event.key === 'm') setControls((controls) => !controls)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [])

  return (
    <div className={styles.root}>
      <header className={cc([styles.header, { [styles.hidden]: !controls }])}>
        <div className={styles.back}>
          <button type="button" onClick={() => router.push(`/book/${id}`)}>
            &larr;
          </button>
        </div>
        <div className={styles.title}>Book Title</div>
        <div className={styles.tools}>
          <button
            onClick={() => {
              !document.fullscreenElement
                ? document.documentElement.requestFullscreen()
                : document.exitFullscreen()
            }}
          >
            Fullscreen
          </button>
          {/* <div>Settings</div> */}
          {/* <div>Download</div> */}
        </div>
      </header>
      <Pages render={render} />
      <footer className={cc([styles.footer, { [styles.hidden]: !controls }])}>
        <div>{index}</div>
        <div>{controls.toString()}</div>
      </footer>
    </div>
  )
}

export default Reader
