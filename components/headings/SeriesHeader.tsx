import { Series } from '@prisma/client'
import AlertDialog from 'components/AlertDialog'
import Button, { ButtonGroup } from 'components/Button'
import Dialog from 'components/Dialog'
import SeriesSettings from 'components/settings/series/Meta'
import { SeriesThumbnailSettings } from 'components/settings/series/Thumbnail'
import { Edit3, Image as ImageIcon, Trash } from 'lucide-react'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from 'styles/headings/SeriesHeader.module.scss'

interface SeriesHeaderProps {
  id: string
  title: string
  image?: string
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
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [thumbOpen, setThumbnailOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <Dialog
        title="Edit Series Thumbnail"
        open={thumbOpen}
        onOpenChange={(open) => setThumbnailOpen(open)}
        content={
          <SeriesThumbnailSettings
            id={id}
            mutate={mutate}
            modalSetter={setThumbnailOpen}
            defaultValue={data.data.thumbnail ?? ''}
          />
        }
      />
      <Dialog
        title="Edit Series"
        open={settingsOpen}
        onOpenChange={(open) => setSettingsOpen(open)}
        content={
          <SeriesSettings
            id={id}
            mutate={mutate}
            modalSetter={setSettingsOpen}
          />
        }
      />
      <AlertDialog
        title={'Delete Series'}
        description={`Are you sure you want to delete ${title}?`}
        open={deleteOpen}
        onOpenChange={(open) => setDeleteOpen(open)}
        onSuccess={() => {
          fetch(`/api/series/${id}`, {
            method: 'DELETE',
          }).then(() => {
            router.push('/')
          })
        }}
      />

      <header className={styles.root}>
        <div className={styles.edit}>
          <ButtonGroup>
            <Button onClick={() => setSettingsOpen(true)}>
              <Edit3 />
            </Button>
            <Button onClick={() => setThumbnailOpen(true)}>
              <ImageIcon />
            </Button>
            <Button onClick={() => setDeleteOpen(true)}>
              <Trash />
            </Button>
          </ButtonGroup>
        </div>
        <div className={styles.background}>
          <Image src={image ? image : '/placeholder.jpg'} alt="" />
        </div>
        <div className={styles.image}>
          <div
            className={styles.wrapper}
            onClick={() => setThumbnailOpen(true)}
          >
            <div className={styles.wrapper__edit}>
              <ImageIcon size={48} />
            </div>
            <Image src={image ? image : '/placeholder.jpg'} alt="" />
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
