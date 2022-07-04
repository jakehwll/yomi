const isProduction =
  process.env.NODE_ENV === 'production' && process.env.DOCKER_ENV

export { isProduction }
