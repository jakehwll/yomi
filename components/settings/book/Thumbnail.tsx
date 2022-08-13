import { Book } from '@prisma/client'
import Button from 'components/Button'
import { FormEvent, useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'util/swr'

interface BookThumbnailSettings {
  id: string
  mutate(): void
  modalSetter(val: boolean): void
  bookData?: Book
}

const BookThumbnailSettings: React.FC<BookThumbnailSettings> = ({
  id,
  mutate,
  modalSetter,
  bookData,
}: BookThumbnailSettings) => {
  const { data, error } = useSWR(`/api/book/${id}/thumbnail?list`, fetcher)
  const [loading, setLoading] = useState(false)
  const [thumbnail, setThumbnail] = useState('undefined')

  useEffect(() => {
    if (!data) return
    setThumbnail((bookData && bookData?.thumbnail) || 'undefined')
  }, [data])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (thumbnail === 'undefined') return
    setLoading(true)
    fetch(`/api/book/${id}/thumbnail`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        thumbnail: thumbnail,
      }),
    }).then((response) => {
      if (response.ok) {
        mutate()
        setLoading(false)
        modalSetter(false)
      } else {
        setLoading(false)
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <select
            defaultValue={'undefined'}
            onChange={(event) => setThumbnail(event.target.value)}
            value={thumbnail}
            disabled={!data}
          >
            <option value={'undefined'}>Select File</option>
            {data &&
              data.data.map((v: any) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
          </select>
        </div>
        <Button style={'success'} wide={true} loading={loading} type="submit">
          Save
        </Button>
      </form>
    </>
  )
}

export { BookThumbnailSettings }
