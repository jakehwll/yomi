import cc from 'classcat'
import Image from 'next/future/image'
import Link from 'next/link'
import styles from 'styles/grid/GridItem.module.scss'

interface GridItemProps {
  image?: string
  headline: string
  subline?: string
  link: string
}

const GridItem: React.FC<GridItemProps> = ({
  image,
  headline,
  subline,
  link,
}: GridItemProps) => {
  return (
    <div className={styles.root}>
      <Link href={link} passHref={true}>
        <a className={styles.link}></a>
      </Link>
      <div className={styles.cover}>
        <Image src={image ? image : '/placeholder.jpg'} alt="" />
      </div>
      <div className={styles.meta}>
        <div className={styles.headline}>{headline}</div>
        <div className={styles.subline}>{subline}</div>
      </div>
    </div>
  )
}

const GridItemGhost: React.FC = () => {
  return (
    <div className={cc([styles.root, styles.ghost])}>
      <div className={styles.cover}></div>
      <div className={cc([styles.meta, styles.meta__ghost])}>
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
