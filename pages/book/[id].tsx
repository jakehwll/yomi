import cc from 'classcat'
import Button, { ButtonGroup } from 'components/Button'
import Slider from 'components/input/Slider'
import { range } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CornerLeftDown,
  CornerRightDown,
  Maximize2,
  Minimize2,
  Settings,
} from 'react-feather'
import { useFullscreen, useToggle } from 'react-use'
import styles from 'styles/Reader.module.scss'
import useSWR from 'swr'
import fetcher from 'util/swr'

const Pages = ({ render }: { render: Array<string> }) => {
  const router = useRouter()
  const { id } = router.query
  const { data, error, mutate } = useSWR(`/api/book/${id}`, fetcher)

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
  const { data, error } = useSWR(`/api/book/${id}`, fetcher)

  // ref
  const ref = useRef(null)

  // constants
  const [index, setIndex] = useState(0)
  const [pageAmount, setPageAmount] = useState(2)
  const [controls, setControls] = useState(true)
  const [render, setRender] = useState<Array<string>>([])

  // hooks
  const [fullscreen, toggleFullscreen] = useToggle(false)
  const isFullscreen = useFullscreen(ref, fullscreen, {
    onClose: () => toggleFullscreen(false),
  })

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
    // TODO only render the front-cover.
    if (index === 0) return setRender([`/api/book/${id}/page/0`])
    if (index === 1) return setRender([`/api/book/${id}/page/1`])
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
      // TODO.
      // home - Return to index 0.
      // end - Return to index last.
      // f - fullscreen.
      // s - settings.
      // / - open keybind menu
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

  if (data)
    return (
      <div className={styles.root} ref={ref}>
        <header className={cc([styles.header, { [styles.hidden]: !controls }])}>
          <div className={styles.back}>
            {data && (
              <Button
                onClick={() => router.push(`/series/${data.data.Series.id}`)}
              >
                <ArrowLeft />
              </Button>
            )}
          </div>
          <div className={styles.title}>
            {data.data && `${data.data.Series.title} - ${data.data.title}`}
          </div>
          <div className={styles.tools}>
            <ButtonGroup>
              <Button onClick={toggleFullscreen}>
                {!isFullscreen ? <Maximize2 /> : <Minimize2 />}
              </Button>
              <Button>
                <Settings />
              </Button>
            </ButtonGroup>
            {/* TODO Download Page */}
          </div>
        </header>
        <Pages render={render} />
        <footer className={cc([styles.footer, { [styles.hidden]: !controls }])}>
          <ButtonGroup>
            <Button onClick={() => setIndex(0)}>
              <CornerLeftDown />
            </Button>
            <Button onClick={() => setIndex((index) => _prev(index))}>
              <ArrowLeft />
            </Button>
          </ButtonGroup>
          <div className={styles.timeline}>
            <Slider />
          </div>
          <ButtonGroup>
            <Button onClick={() => setIndex((index) => _next(index))}>
              <ArrowRight />
            </Button>
            <Button>
              <CornerRightDown />
            </Button>
          </ButtonGroup>
        </footer>
      </div>
    )
  else return <></>
}

export default Reader
