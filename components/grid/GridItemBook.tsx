import { Book } from '@prisma/client'
import cc from 'classcat'
import Button, { ButtonGroup } from 'components/Button'
import Dialog from 'components/Dialog'
import BookSettings from 'components/settings/book/Meta'
import { BookThumbnailSettings } from 'components/settings/book/Thumbnail'
import { Edit3, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import styles from 'styles/grid/GridItem.module.scss'

interface GridItemBookProps {
  id: string
  image?: string
  headline: string
  subline?: string
  link: string
  data: Book
  mutate(): void
}

const GridItemBook: React.FC<GridItemBookProps> = ({
  id,
  image,
  headline,
  subline,
  link,
  data,
  mutate,
}: GridItemBookProps) => {
  const [edit, setEditOpen] = useState(false)
  const [thumbnail, setThumbnailOpen] = useState(false)

  return (
    <div className={styles.root}>
      <div className={styles.edit}>
        <ButtonGroup>
          <Dialog
            title="Edit Book Thumbnail"
            open={thumbnail}
            onOpenChange={(open) => setThumbnailOpen(open)}
            content={
              <BookThumbnailSettings
                id={id}
                mutate={mutate}
                modalSetter={setThumbnailOpen}
                bookData={data}
              />
            }
          >
            <Button>
              <ImageIcon />
            </Button>
          </Dialog>
          <Dialog
            title="Edit Book"
            open={edit}
            onOpenChange={(open) => setEditOpen(open)}
            content={
              <BookSettings id={id} mutate={mutate} modalSetter={setEditOpen} />
            }
          >
            <Button>
              <Edit3 />
            </Button>
          </Dialog>
        </ButtonGroup>
      </div>
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

export default GridItemBook
export { GridItemGhost }
