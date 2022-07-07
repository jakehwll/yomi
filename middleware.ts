import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/login',
  },
})

export const config = {
  matcher: [
    '/',
    '/book/:path*',
    '/media-management/:path*',
    '/series/:path*',
    '/settings/:path*',
    '/search',
  ],
}
