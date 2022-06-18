import { readdirSync } from 'fs'
import path from 'path'

const getDirectoryFiles = async (location: string) => {
  return readdirSync(path.join(process.cwd(), location), {}).map((v: any) => {
    return `${location}/${v}`
  })
}

const getDirectoryFolders = async (location: string) => {
  return readdirSync(path.join(process.cwd(), location), {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map((v: any) => {
      return `${location}/${v.name}`
    })
}

export { getDirectoryFiles, getDirectoryFolders }
