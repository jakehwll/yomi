import { Dirent } from 'fs'
import { globby } from 'globby'
import { isProduction } from './environment'

export interface getDirectoryFilesProps {
  name: string
  path: string
  dirent: Dirent
}

/**
 * Get a list of files in a given directory.
 * @param path The location on the file-system you wish to scan.
 * @param depth How deep you want to scan the file system. Defaults all subdirectories.
 * @returns
 */
const getDirectoryFiles = async ({
  path,
  depth,
}: {
  path: string
  depth?: number
}) => {
  return globby(`${isProduction && process.cwd()}${path}`, {
    objectMode: true,
    onlyFiles: true,
    deep: depth,
  })
}

/**
 * Get a list of folders in a given directory.
 * @param path The location on the file-system you wish to scan.
 * @param depth How deep you want to scan the file system. Defaults all subdirectories.
 * @returns
 */
const getDirectoryFolders = async ({
  path,
  depth,
}: {
  path: string
  depth?: number
}) => {
  return globby(
    `${process.env.NODE_ENV === 'production' && process.cwd()}${path}`,
    {
      objectMode: true,
      onlyDirectories: true,
      deep: depth,
    }
  )
}

export { getDirectoryFiles, getDirectoryFolders }
