import { Series } from '@prisma/client'
import AlertDialog from 'components/AlertDialog'
import Button, { ButtonGroup } from 'components/Button'
import Dialog from 'components/Dialog'
import SeriesSettings from 'components/settings/series/Meta'
import { SeriesThumbnailSettings } from 'components/settings/series/Thumbnail'
import { Edit3, Image as ImageIcon, Trash } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from 'styles/headings/SeriesHeader.module.scss'

interface SeriesHeaderProps {
  id: string
  title: string
  image: string
  volumes: number
  mutate(): void
  data: {
    data: Series
  }
}

const SeriesHeader: React.FC<SeriesHeaderProps> = ({
  id,
  title,
  image,
  volumes,
  mutate,
  data,
}: SeriesHeaderProps) => {
  const router = useRouter()
  const [settings, setSettingsOpen] = useState(false)
  const [thumb, setThumbnailOpen] = useState(false)

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
              <Button onClick={() => setSettingsOpen(true)}>
                <Edit3 />
              </Button>
            </Dialog>
            <Dialog
              title="Edit Series Thumbnail"
              open={thumb}
              onOpenChange={(open) => setThumbnailOpen(open)}
              content={
                <SeriesThumbnailSettings
                  id={id}
                  mutate={mutate}
                  modalSetter={setThumbnailOpen}
                  defaultValue={data.data.thumbnail ?? ''}
                />
              }
            >
              <Button onClick={() => setThumbnailOpen(true)}>
                <ImageIcon />
              </Button>
            </Dialog>
            <AlertDialog
              title={'Delete Series'}
              description={`Are you sure you want to delete ${title}?`}
              onSuccess={() => {
                fetch(`/api/series/${id}`, {
                  method: 'DELETE',
                }).then(() => {
                  router.push('/')
                })
              }}
            >
              <div>
                <Button>
                  <Trash />
                </Button>
              </div>
            </AlertDialog>
          </ButtonGroup>
        </div>
        <div className={styles.background}>
          <img src={image} alt="" />
        </div>
        <div className={styles.image}>
          <Dialog
            title="Edit Series Thumbnail"
            open={thumb}
            onOpenChange={(open) => setThumbnailOpen(open)}
            content={
              <SeriesThumbnailSettings
                id={id}
                mutate={mutate}
                modalSetter={setThumbnailOpen}
                defaultValue={data.data.thumbnail ?? ''}
              />
            }
          >
            <div className={styles.wrapper}>
              <img src={image} alt="" />
            </div>
          </Dialog>
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
