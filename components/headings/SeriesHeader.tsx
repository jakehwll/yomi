import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Image from 'next/image'
import { Edit3 } from 'react-feather'
import styles from 'styles/headings/SeriesHeader.module.scss'

const SeriesSettings = () => {
  return (
    <>
      <div>Hello werld!</div>
    </>
  )
}

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
        <div className={styles.edit}>
          <Dialog title="Edit Series" content={SeriesSettings}>
            <Button>
              <Edit3 />
            </Button>
          </Dialog>
        </div>
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
