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
  Maximize,
  Minimize,
  Settings,
} from 'react-feather'
import { useFullscreen, useToggle } from 'react-use'
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

  return (
    <div className={styles.root} ref={ref}>
      <header className={cc([styles.header, { [styles.hidden]: !controls }])}>
        <div className={styles.back}>
          <Button onClick={() => router.push(`/book/${id}`)}>
            <ArrowLeft />
          </Button>
        </div>
        <div className={styles.title}>Book Title</div>
        <div className={styles.tools}>
          <ButtonGroup>
            <Button onClick={toggleFullscreen}>
              {!isFullscreen ? <Maximize /> : <Minimize />}
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
          <Button>
            <CornerLeftDown />
          </Button>
          <Button>
            <ArrowLeft />
          </Button>
        </ButtonGroup>
        <div className={styles.timeline}>
          <Slider />
        </div>
        <ButtonGroup>
          <Button>
            <CornerRightDown />
          </Button>
          <Button>
            <ArrowRight />
          </Button>
        </ButtonGroup>
      </footer>
    </div>
  )
}

export default Reader
