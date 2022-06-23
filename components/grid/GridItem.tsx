import cc from 'classcat'
import Link from 'next/link'
import styles from 'styles/grid/GridItem.module.scss'

const GridItem = ({
  image,
  headline,
  subline,
  link,
}: {
  image?: string
  headline: string
  subline?: string
  link: string
}) => {
  return (
    <div className={styles.root}>
      <Link href={link} passHref={true}>
        <a className={styles.link}></a>
      </Link>
      <div className={styles.cover}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image ? image : '/placeholder.jpg'} />
      </div>
      <div className={styles.meta}>
        <div className={styles.headline}>{headline}</div>
        <div className={styles.subline}>{subline}</div>
      </div>
    </div>
  )
}

const GridItemGhost = () => {
  return (
    <div className={cc([styles.root, styles.ghost])}>
      <div className={styles.cover}></div>
      <div className={styles.meta}>
        <div className={cc([styles.headline, styles.headline__ghost])}>
          &nbsp;
        </div>
        <div className={cc([styles.subline, styles.subline__ghost])}>
          &nbsp;
        </div>
      </div>
    </div>
  )
}

export default GridItem
export { GridItemGhost }
