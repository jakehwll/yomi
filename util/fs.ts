import { readdirSync } from 'fs'
import path from 'path'

const getDirectoryFiles = async (_path: string) => {
  return readdirSync(path.join(process.cwd(), _path), {}).map((v: any) => {
    return {
      path: _path,
      value: v,
      location: `${_path}/${v}`,
    }
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
