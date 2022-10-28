/** @type {import('next').NextConfig} */

const unstableIncludeFiles = ['.bin', 'bcrypt', '@prisma']

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  unstable_includeFiles: unstableIncludeFiles.map(
    (d) => `node_modules/${d}/**/*`
  ),
  experimental: { images: { allowFutureImage: true } },
}
