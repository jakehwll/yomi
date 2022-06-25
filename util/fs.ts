import { readdirSync } from 'fs'

const getDirectoryFiles = async (_path: string) => {
  return readdirSync(`${process.cwd()}${_path}`, {}).map((v: any) => {
    return {
      path: _path,
      value: v,
      location: `${process.cwd()}${_path}/${v}`,
    }
  })
}

const getDirectoryFolders = async (_path: string) => {
  return readdirSync(`${process.cwd()}${_path}`, {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map((v: any) => {
      return `${v.name}`
    })
}

export { getDirectoryFiles, getDirectoryFolders }
