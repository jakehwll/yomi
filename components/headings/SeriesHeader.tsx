import Button, { ButtonGroup } from 'components/Button'
import Dialog from 'components/Dialog'
import SeriesSettings from 'components/settings/Series'
import Image from 'next/image'
import { useState } from 'react'
import { Edit3, MoreVertical } from 'react-feather'
import styles from 'styles/headings/SeriesHeader.module.scss'

const SeriesHeader = ({
  id,
  title,
  image,
  volumes,
  mutate,
}: {
  id: string
  title: string
  image: string
  volumes: number
  mutate(): void
}) => {
  const [settings, setSettingsOpen] = useState(false)

  return (
    <>
      <header className={styles.root}>
        <div className={styles.edit}>
          <ButtonGroup>
            <Dialog
              title="Edit Series"
              open={settings}
              onOpenChange={(open) => setSettingsOpen(open)}
              content={
                <SeriesSettings
                  id={id}
                  mutate={mutate}
                  modalSetter={setSettingsOpen}
                />
              }
            >
              <Button style={'secondary'} onClick={() => setSettingsOpen(true)}>
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
