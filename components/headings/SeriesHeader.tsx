import Image from 'next/image'
import styles from 'styles/headings/SeriesHeader.module.scss'

const SeriesHeader = ({
  title,
  image,
  volumes,
}: {
  title: string
  image: string
  volumes: number
}) => {
  return (
    <>
      <header className={styles.root}>
        <div className={styles.background}>
          <Image src={image} layout="fill" alt="" />
        </div>
        <div className={styles.image}>
          <div className={styles.wrapper}>
            <Image src={image} layout="fill" alt="" />
          </div>
        </div>
        <div className={styles.content}>
          <h1>{title}</h1>
          <span>{volumes} Volumes</span>
        </div>
      </header>
    </>
  )
}

export default SeriesHeader
