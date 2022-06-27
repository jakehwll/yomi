import { Series } from '@prisma/client'
import Button from 'components/Button'
import Card from 'components/Card'
import Layout from 'components/layout'
import Meta from 'components/Meta'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'util/swr'

const UnassignedSeries = () => {
  const { data } = useSWR('/api/series/unassigned', fetcher)

  const [title, setTitle] = useState('')
  const [folder, setFolder] = useState('')

  const router = useRouter()

  const handleSubmit = (event: FormEvent) => {
    if (!title || !folder) return
    event.preventDefault()
    fetch('/api/series', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        folder: folder,
      }),
    })
      .then((response) => {
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
        <form onSubmit={handleSubmit}>
          <div>
            <select
              defaultValue={'undefined'}
              onChange={(event) => {
                const titleSplit = event.target.value.split('/')
                setFolder(event.target.value)
                setTitle(titleSplit[titleSplit.length - 1])
              }}
            >
              <option value={'undefined'} disabled>
                Select Folder
              </option>
              {data.data.map((v: any) => {
                return (
                  <option key={v} value={`/data/${v}`}>
                    {v}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <input
              placeholder="Series Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <Button style={'primary'} type="submit" wide={true}>
            Create Series
          </Button>
        </form>
      </Card>
    )
  else return <></>
}

const UnassignedVolumes = () => {
  const [series, setSeries] = useState('undefined')
  const [volume, setVolume] = useState('')
  const [volumeTitle, setVolumeTitle] = useState('')

  const { data: seriesData, mutate: seriesMutate } = useSWR(
    `/api/series`,
    fetcher
  )
  const { data: volumesData, mutate: volumesMutate } = useSWR(
    `/api/series/${series}/unassigned`,
    fetcher
  )

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!volumeTitle || !volume || !series) return
    fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: volumeTitle,
        folder: volume,
        seriesId: series,
      }),
    }).then(() => {
      seriesMutate()
      volumesMutate()
      setVolume('')
      setVolumeTitle('')
    })
  }

  if (seriesData)
    return (
      <Card>
        <h2>Unassigned Volumes</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <select
              defaultValue={'undefined'}
              onChange={(event) => setSeries(event.target.value)}
            >
              <option value={'undefined'} disabled>
                Select Series
              </option>
              {seriesData &&
                seriesData.data.map((v: Series) => {
                  return (
                    <option key={v.id} value={v.id}>
                      {v.title}
                    </option>
                  )
                })}
            </select>
          </div>
          {volumesData && (
            <div>
              <select
                defaultValue={'undefined'}
                onChange={(event) => {
                  const titleSplit = event.target.value.split('/')
                  setVolume(event.target.value)
                  setVolumeTitle(titleSplit[titleSplit.length - 1])
                }}
              >
                <option value={'undefined'} disabled>
                  Select Folder
                </option>
                {volumesData.data &&
                  volumesData.data.map((v: String) => {
                    return (
                      <option value={`/${v.toString()}`} key={v.toString()}>
                        {v}
                      </option>
                    )
                  })}
              </select>
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="Volume Title"
              value={volumeTitle}
              onChange={(event) => setVolumeTitle(event.target.value)}
            />
          </div>
          <div>
            <Button style={'primary'} type="submit" wide={true}>
              Create Volume
            </Button>
          </div>
        </form>
      </Card>
    )
  return <></>
}

const Home: NextPage = () => {
  return (
    <>
      <Meta title={'Media Management'} />
      <Layout>
        <UnassignedSeries />
        <UnassignedVolumes />
      </Layout>
    </>
  )
}

export default Home
