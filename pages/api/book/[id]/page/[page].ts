import { readFileSync } from 'fs'
import { flatten, keyBy } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import sharp from 'sharp'
import { getBook } from 'util/book'
import { getDirectoryFiles } from 'util/fs'

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id, page } = req.query
  const book = await getBook(id.toString())
  if (!book) {
    res.status(404).send({})
    return
  }
  const parsePageNumber = (input: string) => {
    // remove p from the start of string
    const rawNumber = input.substring(1, input.length)
    return parseInt(rawNumber)
  }
  const files = await (
    await getDirectoryFiles(book.folder)
  ).map((pageString) => {
    const pageMatches = pageString.value.match(/p\d+/g)
    if (!pageMatches) return
    if (pageMatches.length === 1) {
      return [{ pageNum: parsePageNumber(pageMatches[0]), value: pageString }]
    } else {
      const expandedMatches = pageMatches.map((v: string, i: number) => {
        return {
          pageNum: parsePageNumber(pageMatches[i]),
          series: {
            index: i,
            total: pageMatches.length,
          },
          value: pageString,
        }
      })
      return expandedMatches
    }
  })
  const beautiful = keyBy(flatten(files), 'pageNum')

  const fileMeta = beautiful[parseInt(page.toString() ?? '')]
  const filePath = path.join(process.cwd(), fileMeta.value.location)
  let imageBuffer = readFileSync(filePath)

  if (fileMeta.series) {
    const _metaData = await sharp(imageBuffer).metadata()
    const _width = _metaData.width ?? 0
    const _height = _metaData.height ?? 0
    const _slices = Math.floor(_width / fileMeta.series.total)
    imageBuffer = await sharp(imageBuffer)
      .extract({
        left: _slices * fileMeta.series.index,
        top: 0,
        width: _slices,
        height: _height,
      })
      .toBuffer()
  }

  res.setHeader('Content-Type', 'image/jpg')
  res.status(200).send(imageBuffer)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404)
}
