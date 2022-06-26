import Button from 'components/Button'
import { FormEvent, useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'util/swr'

interface SeriesThumbnailSettingsProps {
  id: string
  mutate(): void
  modalSetter(val: boolean): void
  defaultValue?: string
}

const SeriesThumbnailSettings: React.FC<SeriesThumbnailSettingsProps> = ({
  id,
  mutate,
  modalSetter,
  defaultValue,
}: SeriesThumbnailSettingsProps) => {
  const { data, error } = useSWR(`/api/series/${id}/thumbnail?list`, fetcher)
  const [loading, setLoading] = useState(false)
  const [thumbnail, setThumbnail] = useState(defaultValue ?? 'none')

  useEffect(() => {
    if (!data) return
    setThumbnail(defaultValue ?? '')
  }, [data])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    fetch(`/api/series/${id}/thumbnail`, {
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
            <option value={'undefined'} disabled>
              Select File
            </option>
            {data &&
              data.data.map((v: any) => {
                return (
                  <option key={v} value={v} selected={v === defaultValue}>
                    {v}
                  </option>
                )
              })}
          </select>
        </div>
        <Button style={'success'} wide={true} loading={loading} type="submit">
          Save
        </Button>
      </form>
    </>
  )
}

export { SeriesThumbnailSettings }
