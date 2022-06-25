import Button from 'components/Button'
import { FormEvent, useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'util/swr'

const SeriesThumbnailSettings = ({
  id,
  mutate,
  modalSetter,
}: {
  id: string
  mutate(): void
  modalSetter(val: boolean): void
}) => {
  const { data, error } = useSWR(`/api/series/${id}/thumbnail?list`, fetcher)

  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')

  useEffect(() => {
    if (!data) return
    setTitle(data.data.title ?? 'undefined')
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
        title: title,
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
          <select defaultValue={'undefined'} onChange={(event) => {}}>
            <option value={'undefined'} disabled>
              Select File
            </option>
            {data &&
              data.data.map((v: any) => {
                return (
                  <option key={v} value={v}>
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
