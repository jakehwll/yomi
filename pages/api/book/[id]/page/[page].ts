import { Dirent, readFileSync } from 'fs'
import { flatten, keyBy } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import { getBook } from 'util/book'
import { getDirectoryFiles } from 'util/fs'
import { getAuthorisedUser } from 'util/users'

interface getDirectoryFilesProps {
  name: string
  path: string
  dirent: Dirent
}

interface PageMetadataProps {
  metadata: {
    name: string
    path: string
  }
  series?: {
    index: number
    total: number
  }
}

const getFilesData = ({ files }: { files: Array<getDirectoryFilesProps> }) => {
  const rawFileArray = files.map(({ name, path }: getDirectoryFilesProps) => {
    // grab the `p000-(p)000` string from the filename.
    let regexPageNumbers = name.match(/p\d+-?p?\d+/)
    // file looks good, let's run our magic on it.
    if (regexPageNumbers) {
      // set it to the first result.
      let rawPageNumbers = regexPageNumbers[0]
      // just double check for sure that we have a page number for ts.
      if (rawPageNumbers != null) {
        // sweet. lets dump the pages out.
        const pages = rawPageNumbers!.match(/^p(\d+)(?:-p?(\d+))?$/)
        // no pages? impossible, but here, lets just run away.
        if (!pages) return
        // great, lets remove the first `p`.
        const filteredPages = pages.slice(1).filter((x: string) => {
          return x !== undefined
        })
        // great, lets check if we have multiple pages in one file.
        if (filteredPages.length === 1) {
          // singular page? lets just return the file!
          return [
            {
              _pageNum: parseInt(
                filteredPages[0].replaceAll('p', '')
              ).toString(),
              metadata: {
                name: name,
                path: path,
              },
            },
          ]
        } else {
          // multiple pages? lets split them up!
          return filteredPages.map((page: string, index: number) => {
            return {
              _pageNum: parseInt(page.replaceAll('p', '')).toString(),
              metadata: {
                name: name,
                path: path,
              },
              series: {
                index: index,
                total: filteredPages.length,
              },
            }
          })
        }
      }
    }
  })
  return keyBy(flatten(rawFileArray), '_pageNum')
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  // check we have an authorised user.
  if (!(await getAuthorisedUser(req)))
    return res.status(403).json({ error: 'Unauthorised. Nice try.', code: 403 })
  //
  // gather the id from the request
  const { id, page } = req.query
  // gather the book data from the request.
  const book = await getBook(id.toString())
  // 404 if we don't have the book on file.
  if (!book || !book.Series) {
    res.status(404).send({
      error: 'Request object not found',
      code: 404,
    })
    return
  }
  // gather all files from the book.
  let files = await getDirectoryFiles({
    path: `${book.Series.folder}${book.folder}`,
  })
  // map all our files and detect their titles.
  let filesData = getFilesData({ files: files })
  // alright. now that we have our data, let's create the buffer!
  const fileMeta = filesData[
    parseInt(page.toString() ?? '')
  ] as PageMetadataProps
  const fileURI = fileMeta?.metadata.path
  let imageBuffer = readFileSync(fileURI ?? '')
  // lets see if we have a series to manipulate.
  if (fileMeta.series) {
    // pull the width and height, and divide the width by how many slices we need.
    const { width, height } = await sharp(imageBuffer).metadata()
    const sliceWidth = Math.floor((width ?? 0) / fileMeta.series.total)
    // return an image buffer with the cropped image.
    const newImageBuffer = await sharp(imageBuffer)
      .extract({
        left: sliceWidth * fileMeta.series.index,
        top: 0,
        width: sliceWidth,
        height: height ?? 0,
      })
      .toBuffer()
    // we should have our buffer by now, lets serve him!
    res.setHeader('Content-Type', 'image/jpg')
    res.status(200).send(newImageBuffer)
    return res.end()
  } else {
    // we should have our buffer by now, lets serve him!
    res.setHeader('Content-Type', 'image/jpg')
    res.status(200).send(imageBuffer)
    return res.end()
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404).json({ error: 'Invalid method for route.', code: 404 })
}
