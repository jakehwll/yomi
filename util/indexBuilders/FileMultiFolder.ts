import { readFileSync } from 'fs'
import { flatten, keyBy } from 'lodash'
import sharp from 'sharp'
import { pageMetaData } from 'util/book'
import { getDirectoryFilesProps } from 'util/fs'

/**
 * Returns readable metadata to the `/book/{id}` page.
 * @param files A list of files in the getDirectoryFilesProps format (globify).
 * @returns An Array<pageMetaData> object.
 */
const getFilesData = async ({
  files,
}: {
  files: Array<getDirectoryFilesProps>
}): Promise<Array<pageMetaData>> => {
  const rawFileArray = files
    .map(({ name, path }: getDirectoryFilesProps) => ({
      name: name,
      path: path.replaceAll(name, ''),
    }))
    .sort((a, b) => a.path.localeCompare(b.path, 'en', { numeric: true }))
  let pages = await Promise.all(
    rawFileArray.map(async ({ name, path }: { name: string; path: string }) => {
      const fileURI = path + name
      const imageBuffer = readFileSync(fileURI ?? '')
      const { width, height } = await sharp(imageBuffer).metadata()
      if (!width || !height) return
      // great, lets check if we have multiple pages in one file.
      if (width > height) {
        // multiple pages? lets split them up!
        return [
          {
            metadata: {
              name: name,
              path: `${path}${name}`,
            },
            series: {
              index: 0,
              total: 2,
            },
          },
          {
            metadata: {
              name: name,
              path: `${path}${name}`,
            },
            series: {
              index: 1,
              total: 2,
            },
          },
        ]
      } else {
        return {
          metadata: {
            name: name,
            path: `${path}${name}`,
          },
        }
      }
    })
  )
  pages = flatten(pages)
  pages = pages.map((v: any, i: number) => {
    v['_pageNum'] = i
    return v
  })
  return keyBy(flatten(pages), '_pageNum') as any
}

export { getFilesData }
