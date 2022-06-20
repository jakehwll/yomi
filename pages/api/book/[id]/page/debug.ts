import { NextApiRequest, NextApiResponse } from 'next'
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
    const rawNumber = input.replaceAll('p', '')
    return parseInt(rawNumber)
  }
  const files = await (
    await getDirectoryFiles(book.folder)
  ).map((pageString) => {
    const pageMatchesRaw = pageString.value.match(/p\d+-?p?\d+/)
    const pageMatchesArray = pageMatchesRaw[0]
      .match(/^p(\d+)(?:-p?(\d+))?$/)
      .slice(1)
      .filter((x: string) => {
        return x !== undefined
      })
    // if (!pageMatches) return
    // if (pageMatches.length === 1) {
    //   return [{ pageNum: parsePageNumber(pageMatches[0]), value: pageString }]
    // } else {
    //   const expandedMatches = pageMatches.map((v: string, i: number) => {
    //     return {
    //       pageNum: parsePageNumber(pageMatches[i]),
    //       series: {
    //         index: i,
    //         total: pageMatches.length,
    //       },
    //       value: pageString,
    //     }
    //   })
    //   return expandedMatches
    // }
  })

  res.status(200).json({
    values: files,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.status(404)
}
