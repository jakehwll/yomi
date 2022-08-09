import cc from 'classcat'
import Button, { ButtonGroup } from 'components/Button'
import Dialog from 'components/Dialog'
import Checkbox from 'components/input/Checkbox'
import Slider from 'components/input/Slider'
import Meta from 'components/Meta'
import { range } from 'lodash'
import {
  ArrowLeft,
  ArrowRight,
  CornerLeftDown,
  CornerRightDown,
  Maximize2,
  Minimize2,
  Settings,
} from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useFullscreen, useToggle } from 'react-use'
import styles from 'styles/pages/Reader.module.scss'
import useSWR from 'swr'
import fetcher from 'util/swr'

const Pages = ({ render }: { render: Array<string> }) => {
  return (
    <section>
      <div
        className={cc([
          styles.canvas,
          {
            [styles.dual]: render.length > 1,
          },
        ])}
      >
        {render.map((v: string, i: number) => {
          return (
            <div className={styles.page} key={v}>
              <img src={v} alt="" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

const FauxPages = ({ fauxRender }: { fauxRender: Array<string> }) => {
  return (
    <div className={styles.faux}>
      {fauxRender.map((v: string, i: number) => {
        return (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v} alt="" />
          </>
        )
      })}
    </div>
  )
}

const ReaderSettings = ({
  index,
  setIndex,
  invertControls,
  setInvertControls,
  invertPages,
  setInvertPages,
  pageAmount,
  setPageAmount,
}: {
  index: number
  setIndex(val: number): void
  invertControls: boolean
  setInvertControls(val: boolean): void
  invertPages: boolean
  setInvertPages(val: boolean): void
  pageAmount: number
  setPageAmount(val: number): void
}) => {
  return (
    <div>
      <Checkbox
        label="Invert Controls"
        name={'invert-controls'}
        id={'invert-controls'}
        value={invertControls}
        onChange={() => setInvertControls(!invertControls)}
      />
      <Checkbox
        label="Invert Pages"
        name={'invert-pages'}
        id={'invert-pages'}
        value={invertPages}
        onChange={() => setInvertPages(!invertPages)}
      />
      <Checkbox
        label="Dual Pages"
        name={'dual-pages'}
        id={'dual-pages'}
        value={pageAmount == 2}
        onChange={(event) => {
          setPageAmount((event.target as HTMLInputElement).checked ? 2 : 1)
          setIndex(
            (event.target as HTMLInputElement).checked ? index / 2 : index * 2
          )
        }}
      />
    </div>
  )
}

const Reader = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(`/api/book/${id}`, id ? fetcher : () => {})

  // ref
  const rootRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  // states
  const [index, setIndex] = useState(0)
  const [pageAmount, setPageAmount] = useState(2)
  const [pageCount, setPageCount] = useState(0)

  const [hideControls, setHideControls] = useState(true)
  const [mouseControls, setMouseControls] = useState(false)

  const [render, setRender] = useState<Array<string>>([])
  const [fauxRender, setFauxRender] = useState<Array<string>>([])

  const [nextChapter, setNextChapter] = useState(0)

  // next chapter
  useEffect(() => {
    console.log(data)
    if (!data) return
    if (!('next' in data)) return setNextChapter(0)
    if (nextChapter === 1) setTimeout(() => setNextChapter(0), 3000)
    if (nextChapter === 2) {
      router.push(`/book/${data.next}`)
    }
  }, [nextChapter])

  // resume progress
  useEffect(() => {
    if (!data) return
    setIndex(data.data.ReadProgress ? data.data.ReadProgress.progress : 0)
  }, [data])

  // hooks
  const [fullscreen, toggleFullscreen] = useToggle(false)
  const isFullscreen = useFullscreen(rootRef, fullscreen, {
    onClose: () => toggleFullscreen(false),
  })

  // controls
  const [invertControls, setInvertControls] = useState(false)
  const [invertPages, setInvertPages] = useState(false)

  const readerSettingProps = {
    index: index,
    setIndex: setIndex,
    invertControls: invertControls,
    setInvertControls: setInvertControls,
    invertPages: invertPages,
    setInvertPages: setInvertPages,
    pageAmount: pageAmount,
    setPageAmount: setPageAmount,
  }

  const _prev = (pageNum: number) => {
    // dont allow to page out of bounds.
    if (pageNum - 1 < 0) return 0
    // add one to our page number to decrement.
    return pageNum - 1
  }
  const _next = (pageNum: number) => {
    // jump to the next book
    if (pageNum + 1 > pageCount / pageAmount - 1) {
      setNextChapter((nextChapter) => nextChapter + 1)
      return pageCount / pageAmount - 1
    }
    // add one to our page number to increment.
    return pageNum + 1
  }

  useEffect(() => {
    if (id === undefined) return setRender([])
    if (index === 0) return setRender([`/api/book/${id}/page/0`])
    if (index === 1) return setRender([`/api/book/${id}/page/1`])
    if (index === pageCount)
      return setRender([`/api/book/${id}/page/${pageCount}`])
    // loop all pages for our pageAmount range and render them
    let pages = range(index * pageAmount, index * pageAmount + pageAmount).map(
      (v: number) => `/api/book/${id}/page/${v}`
    )
    // reverse if inverted layout (manga).
    if (invertPages) pages = pages.reverse()
    // update the renderer.
    setRender(pages)
  }, [id, index, invertPages, pageAmount])

  useEffect(() => {
    if (!id) return
    if (index * pageAmount - 2 < 1)
      setFauxRender(
        range(0, 10).map((v: number) => `/api/book/${id}/page/${v}`)
      )
    else if (index * pageAmount + 8 > pageCount)
      setFauxRender(
        range(pageCount - 2, pageCount + 8).map(
          (v: number) => `/api/book/${id}/page/${v}`
        )
      )
    else
      setFauxRender(
        range(index * pageAmount - 2, index * pageAmount + 8).map(
          (v: number) => `/api/book/${id}/page/${v}`
        )
      )
  }, [id, index])

  useEffect(() => {
    if (!data) return
    setPageCount(data.pages)
  }, [data])

  useEffect(() => {
    if (data)
      fetch(`/api/book/${data.data.id}/read_progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          progress: Math.floor(index),
        }),
      })
  }, [index])

  // TODO.
  // home - Return to index 0.
  // end - Return to index last.
  // s - settings.
  // / - open keybind menu

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (
        ['INPUT', 'BUTTON'].includes(
          (document.activeElement && document.activeElement?.tagName) || ''
        )
      )
        return
      event.key === ' ' && setHideControls((hideControls) => !hideControls)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [])

  useEffect(() => {
    if (
      ['INPUT'].includes(
        (document.activeElement && document.activeElement?.tagName) || ''
      )
    )
      return
    const keyHandler = (event: KeyboardEvent) => {
      event.key === 'f' && toggleFullscreen()
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [])

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (
        ['INPUT', 'BUTTON'].includes(
          (document.activeElement && document.activeElement?.tagName) || ''
        )
      )
        return
      if (document.activeElement?.getAttribute('role') === 'slider') return
      if (event.key === 'ArrowRight')
        setIndex((pageNum) =>
          invertControls ? _prev(pageNum) : _next(pageNum)
        )
      if (event.key === 'ArrowLeft')
        setIndex((pageNum) =>
          invertControls ? _next(pageNum) : _prev(pageNum)
        )
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [pageCount, invertControls])

  // controls shown state update
  useEffect(() => {
    if (!rootRef.current) return
    let controlTimer: any = undefined
    const eventHandler = (event: Event) => {
      setMouseControls(true)
      clearTimeout(controlTimer && controlTimer)
      controlTimer = setTimeout(() => {
        // dont hide if in header
        if (
          headerRef.current?.contains(event.target as HTMLElement) ||
          footerRef.current?.contains(event.target as HTMLElement)
        )
          return
        setMouseControls(false)
      }, 2000)
    }
    rootRef.current.addEventListener('mousemove', eventHandler)
    return () => rootRef.current?.removeEventListener('mousemove', eventHandler)
  }, [rootRef])

  return (
    <>
      <div className={styles.root} ref={rootRef}>
        {data ? (
          <Meta title={`${data.data.Series.title} - ${data.data.title}`} />
        ) : (
          <Meta title={''} />
        )}
        {data && (
          <>
            {nextChapter === 1 && (
              <section className={styles.nextVolume}>
                Press next page again to move to the next Volume!
              </section>
            )}
            <header
              className={cc([
                styles.header,
                { [styles.hidden]: !hideControls && !mouseControls },
              ])}
              ref={headerRef}
            >
              <div className={styles.wrapper}>
                <div className={styles.back}>
                  {data && (
                    <Button
                      onClick={() =>
                        router.push(`/series/${data.data.Series.id}`)
                      }
                    >
                      <ArrowLeft />
                    </Button>
                  )}
                </div>
                <div className={styles.title}>
                  {data.data &&
                    `${data.data.Series.title} - ${data.data.title} (${
                      index * pageAmount + 1
                    }/${pageCount})`}
                </div>
                <div className={styles.tools}>
                  <ButtonGroup>
                    {document.fullscreenEnabled && (
                      <Button
                        onClick={(event) => {
                          event.currentTarget.blur()
                          toggleFullscreen()
                        }}
                      >
                        {!isFullscreen ? <Maximize2 /> : <Minimize2 />}
                      </Button>
                    )}
                    <Dialog
                      title={'Reader Settings'}
                      content={<ReaderSettings {...readerSettingProps} />}
                      ref={rootRef.current || undefined}
                      onOpenChange={(open) =>
                        open === true && toggleFullscreen(false)
                      }
                    >
                      <Button onClick={(event) => event.currentTarget.blur()}>
                        <Settings />
                      </Button>
                    </Dialog>
                  </ButtonGroup>
                  {/* TODO Download Page */}
                </div>
              </div>
            </header>
            {/* <div className={styles.control}>
              <button className={styles.control__left} type="button"></button>
              <button className={styles.control__right} type="button"></button>
            </div> */}
            <Pages render={render} />
            {id && <FauxPages fauxRender={fauxRender} />}
            <footer
              className={cc([
                styles.footer,
                { [styles.hidden]: !hideControls && !mouseControls },
              ])}
              ref={footerRef}
            >
              <div className={styles.wrapper}>
                <ButtonGroup>
                  <Button
                    onClick={(event) => {
                      event.currentTarget.blur()
                      setIndex(0)
                    }}
                  >
                    <CornerLeftDown />
                  </Button>
                  <Button
                    onClick={(event) => {
                      event.currentTarget.blur()
                      setIndex((index) => _prev(index))
                    }}
                  >
                    <ArrowLeft />
                  </Button>
                </ButtonGroup>
                <div className={styles.timeline}>
                  <Slider
                    value={index + 1}
                    max={pageCount / pageAmount - 1}
                    onValueChange={(number) => setIndex(number[0])}
                  />
                </div>
                <ButtonGroup>
                  <Button
                    onClick={(event) => {
                      event.currentTarget.blur()
                      setIndex((index) => _next(index))
                    }}
                  >
                    <ArrowRight />
                  </Button>
                  <Button
                    onClick={(event) => {
                      event.currentTarget.blur()
                      setIndex(pageCount / pageAmount - 1)
                    }}
                  >
                    <CornerRightDown />
                  </Button>
                </ButtonGroup>
              </div>
            </footer>
          </>
        )}
      </div>
    </>
  )
}

export default Reader
