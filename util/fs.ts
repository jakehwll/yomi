import { globby } from 'globby'

const getDirectoryFiles = async ({ path }: { path: string }) => {
  return globby(`${process.cwd()}${path}`, {
    objectMode: true,
    onlyFiles: true,
  })
}

const getDirectoryFolders = async ({
  path,
  depth,
}: {
  path: string
  depth?: number
}) => {
  return globby(`${process.cwd()}${path}`, {
    objectMode: true,
    onlyDirectories: true,
    deep: depth,
  })
  // return readdirSync(`${process.cwd()}${_path}`, {
  //   withFileTypes: true,
  // })
  //   .filter((dirent) => dirent.isDirectory())
  //   .map((v: any) => {
  //     return `${v.name}`
  //   })
}

export { getDirectoryFiles, getDirectoryFolders }
