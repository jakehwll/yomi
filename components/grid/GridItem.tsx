import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/grid/GridItem.module.scss'

const Item = ({
  headline,
  subline,
  link,
}: {
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
        <Image src="/thumbnail.jpg" layout="fill" />
      </div>
      <div className={styles.meta}>
        <div className={styles.headline}>{headline}</div>
        <div className={styles.subline}>{subline}</div>
      </div>
    </div>
  )
}

export default Item
