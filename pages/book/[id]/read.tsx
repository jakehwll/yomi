import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from 'styles/Reader.module.scss'

const Reader = () => {
  const router = useRouter()

  // constants
  const [index, setIndex] = useState(0)
  const [pageAmount, setPageAmount] = useState(1)
  const [render, setRender] = useState<Array<string>>([])
  const [keyDown, setKeydown] = useState('')

  // controls
  const [invertControl, setInvertControl] = useState(false)

  const _pages = [
    '/book/page1.jpg',
    '/book/page2.jpg',
    '/book/page3.jpg',
    '/book/page4.jpg',
    '/book/page5.jpg',
    '/book/page6.jpg',
  ]

  const _prev = () => {
    if (index <= 0) return
    setIndex(index - 1)
  }

  const _next = () => {
    if (index >= Math.ceil(_pages.length / pageAmount) - 1) return
    setIndex(index + 1)
  }

  useEffect(() => {
    setRender(_pages.slice(index * pageAmount, index * pageAmount + pageAmount))
  }, [index])

  useEffect(() => {
    if (!keyDown) return
    if (keyDown === 'ArrowLeft') invertControl ? _next() : _prev()
    if (keyDown === 'ArrowRight') invertControl ? _prev() : _next()
    setKeydown('')
  }, [keyDown])

  useEffect(
    () => window.addEventListener('keydown', (event) => setKeydown(event.key)),
    []
  )

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.back}>
          <button type="button" onClick={() => router.push('/book/test')}>
            &larr;
          </button>
        </div>
        <div className={styles.title}>Book Title</div>
        <div className={styles.tools}>
          <div>Fullscreen</div>
          <div>Settings</div>
          <div>Download</div>
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
      <footer className={styles.footer}>{index}</footer>
    </div>
  )
}

export default Reader
