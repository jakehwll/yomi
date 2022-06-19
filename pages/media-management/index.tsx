import { Series } from '@prisma/client'
import Layout from 'components/layout'
import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'util/swr'

const UnassignedSeries = () => {
  const { data, error, mutate } = useSWR('/api/series/unassigned', fetcher)

  const [title, setTitle] = useState('')
  const [folder, setFolder] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    fetch('/api/series', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        folder: folder,
      }),
    }).then(() => {
      mutate()
    })
  }

  if (data)
    return (
      <>
        <h2>Unassigned Series</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <select
              defaultValue={'undefined'}
              onChange={(event) => setFolder(event.target.value)}
            >
              <option value={'undefined'} disabled>
                Select Folder
              </option>
              {data.data.map((v: any) => {
                return (
                  <option key={v} value={v}>
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
          <button type="submit">Submit</button>
        </form>
      </>
    )
  else return <></>
}

const UnassignedVolumes = () => {
  const [series, setSeries] = useState('undefined')
  const [volume, setVolume] = useState('')
  const [volumeTitle, setVolumeTitle] = useState('')

  const {
    data: seriesData,
    error: seriesError,
    mutate: seriesMutate,
  } = useSWR(`/api/series`, fetcher)
  const {
    data: volumesData,
    error: volumesError,
    mutate: volumesMutate,
  } = useSWR(`/api/series/${series}/unassigned`, fetcher)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log({
      title: volumeTitle,
      folder: volume,
      seriesId: series,
    })
    fetch('/api/book', {
      method: 'POST',
      body: JSON.stringify({
        title: volumeTitle,
        folder: volume,
        seriesId: series,
      }),
    }).then(() => {
      seriesMutate()
      volumesMutate()
    })
  }

  if (seriesData)
    return (
      <>
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
              {seriesData.data.map((v: Series) => {
                return (
                  <option key={v.id} value={v.id}>
                    {v.title}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <select
              defaultValue={'undefined'}
              onChange={(event) => setVolume(event.target.value)}
            >
              <option value={'undefined'} disabled>
                Select Folder
              </option>
              {volumesData &&
                volumesData.data.map((v: String) => {
                  return (
                    <option value={v.toString()} key={v.toString()}>
                      {v}
                    </option>
                  )
                })}
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Series Title"
              value={volumeTitle}
              onChange={(event) => setVolumeTitle(event.target.value)}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </>
    )
  return <>...</>
}

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>Media Management</h1>
      <UnassignedSeries />
      <UnassignedVolumes />
    </Layout>
  )
}

export default Home
