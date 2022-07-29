import { Series } from '@prisma/client'
import Card from 'components/Card'
import Form from 'components/form/Form'
import { Input, Select } from 'components/form/Input'
import Layout from 'components/layout'
import Meta from 'components/Meta'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'util/swr'

const UnassignedSeries = () => {
  const { data } = useSWR('/api/series/unassigned', fetcher)
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleSubmit = (data: any) => {
    setLoading(true)
    fetch('/api/series', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folder: data.folder,
        title: data.title,
      }),
    })
      .then((response) => {
        setLoading(false)
        if (response.ok) return response.json()
      })
      .then((response) => {
        router.push(`/series/${response.data.id}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (data)
    return (
      <Card>
        <h2>Unassigned Series</h2>
        <Form
          onSubmit={handleSubmit}
          submitText={'Create Series'}
          loading={loading}
        >
          <Select
            label={'Select Folder'}
            name={'folder'}
            options={data ? data.data : []}
            disabled={loading}
            required
          />
          <Input
            label={'Series Title'}
            name={'title'}
            disabled={loading}
            required
          />
        </Form>
      </Card>
    )
  else return <></>
}

const UnassignedBooks = () => {
  const [currentSeries, setCurrentSeries] = useState('')
  const { data: seriesData, mutate: seriesMutate } = useSWR(
    `/api/series`,
    fetcher
  )
  const { data: booksData, mutate: booksMutate } = useSWR(
    `/api/series/${currentSeries}/unassigned`,
    currentSeries ? fetcher : null
  )

  const [loading, setLoading] = useState(false)

  const handleSubmit = (data: any) => {
    setLoading(true)
    fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seriesId: data.series,
        title: data.title,
        folder: data.folder,
      }),
    }).then(() => {
      setLoading(false)
      seriesMutate()
    })
  }

  if (seriesData)
    return (
      <Card>
        <h2>Unassigned Books</h2>
        <Form
          onSubmit={handleSubmit}
          submitText={'Create Book'}
          loading={loading}
        >
          <Select
            label="Series"
            name={'series'}
            options={
              seriesData
                ? seriesData.data.map((v: Series) => {
                    return [v.id, v.title]
                  })
                : []
            }
            onChange={(event: ChangeEvent<HTMLOptionElement>) =>
              setCurrentSeries(event.target.value)
            }
            disabled={loading}
          />
          <Select
            label="Folder"
            name={'folder'}
            options={
              booksData
                ? booksData.data.map((v: any) => {
                    return [v, v]
                  })
                : []
            }
            disabled={loading}
          />
          <Input label="Volume Title" name="title" disabled={loading} />
        </Form>
      </Card>
    )
  return <></>
}

const MediaManagement: NextPage = () => {
  return (
    <>
      <Meta title={'Media Management'} />
      <Layout>
        <UnassignedSeries />
        <UnassignedBooks />
      </Layout>
    </>
  )
}

export default MediaManagement
