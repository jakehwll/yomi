import { flatten, keyBy } from 'lodash'
import { getDirectoryFilesProps } from './fs'
import prisma from './prisma'

export interface pageMetaData {
  metadata: {
    name: string
    path: string
  }
  series?: {
    index: number
    total: number
  }
}

/**
 * Grab a book based on its bookId value.
 * @param bookId Given Book's Id in the database.
 * @returns Found <Book /> object or null.
 */
const getBook = async (bookId: string) => {
  return await prisma.book.findFirst({
    where: {
      id: {
        equals: bookId,
      },
    },
    include: {
      Series: true,
    },
  })
}

/**
 * Update a book based on its bookId value.
 * @param bookId Given Book's Id in the database.
 * @param data New data to insert into the database.
 * @returns Found book object or null.
 */
const updateBook = async (bookId: string, data: Object) => {
  return await prisma.book.update({
    where: {
      id: bookId,
    },
    data: data,
  })
}

/**
 * Returns readable metadata to the `/book/{id}` page.
 * @param files A list of files in the getDirectoryFilesProps format (globify).
 * @returns An Array<pageMetaData> object.
 */
const getFilesData = ({
  files,
}: {
  files: Array<getDirectoryFilesProps>
}): Array<pageMetaData> => {
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
  return keyBy(flatten(rawFileArray), '_pageNum') as any
}

export { getBook, updateBook, getFilesData }
