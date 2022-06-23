import { Item } from '@radix-ui/react-dropdown-menu'
import AlertDialog from 'components/AlertDialog'
import Button, { ButtonGroup } from 'components/Button'
import Dialog from 'components/Dialog'
import SeriesSettings from 'components/settings/Series'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Edit3, Trash } from 'react-feather'
import styles from 'styles/headings/SeriesHeader.module.scss'

const MoreDropdown = () => {
  const [deleteDialog, setDeleteDialog] = useState(false)

  return <Item className={styles.item}></Item>
}

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
  const router = useRouter()
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
              <Button onClick={() => setSettingsOpen(true)}>
                <Edit3 />
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
function setDeleteDialog(value: boolean): void {
  throw new Error('Function not implemented.')
}
