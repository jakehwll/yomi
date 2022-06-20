import Button, { ButtonGroup } from 'components/Button'
import Dialog from 'components/Dialog'
import Text from 'components/input/Text'
import Image from 'next/image'
import { Edit3, MoreVertical } from 'react-feather'
import styles from 'styles/headings/SeriesHeader.module.scss'

const SeriesSettings = () => {
  return (
    <>
      <Text
        label={'Title'}
        id={'title'}
        name={'title'}
        value={''}
        onChange={() => {}}
      />
      <Button style={'success'}>Save</Button>
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
          <ButtonGroup>
            <Dialog title="Edit Series" content={<SeriesSettings />}>
              <Button opaque={true} style={'secondary'}>
                <Edit3 />
              </Button>
            </Dialog>
            <Button>
              <MoreVertical />
            </Button>
          </ButtonGroup>
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
