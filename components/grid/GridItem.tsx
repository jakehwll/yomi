import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/grid/GridItem.module.scss'

const Item = ({
  title,
  author,
  link,
}: {
  title: string
  author: string
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
        <div className={styles.title}>{title}</div>
        <div className={styles.author}>{author}</div>
      </div>
    </div>
  )
}

export default Item
