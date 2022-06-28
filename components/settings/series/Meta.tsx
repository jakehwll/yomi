import Button from 'components/Button'
import Text from 'components/input/Text'
import { FormEvent, useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'util/swr'

interface SeriesSettingsProps {
  id: string
  mutate(): void
  modalSetter(val: boolean): void
}

const SeriesSettings: React.FC<SeriesSettingsProps> = ({
  id,
  mutate,
  modalSetter,
}: SeriesSettingsProps) => {
  const { data, error } = useSWR(`/api/series/${id}`, fetcher)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (!data) return
    setTitle(data.data.title ?? 'undefined')
  }, [data])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    fetch(`/api/series/${id}`, {
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
        <Text
          label={'Title'}
          id={'title'}
          name={'title'}
          value={title}
          disabled={loading}
          onChange={(event) =>
            setTitle((event.target as HTMLInputElement).value)
          }
        />
        <Button style={'success'} wide={true} loading={loading} type="submit">
          Save
        </Button>
      </form>
    </>
  )
}

export default SeriesSettings
