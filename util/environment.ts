const isProduction = process.env.NODE_ENV === 'production'
const isContainerised =
  process.env.DOCKER_ENV === 'production' ||
  process.env.DOCKER_ENV === 'development'

export { isProduction, isContainerised }
