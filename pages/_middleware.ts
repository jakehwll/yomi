import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

async function backend(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!session) {
    return NextResponse.json({
      error: 'Unauthorised.',
      code: 403,
    })
  }
  return NextResponse.next()
}

async function frontend(req: NextRequest) {
  const url = req.nextUrl.clone()
  const unauthorisedRoutes = ['/auth/login', '/auth/register']
  if (
    unauthorisedRoutes.includes(url.pathname) ||
    url.pathname.startsWith('/_next')
  ) {
    return NextResponse.next()
  } else {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (session === null) {
      return NextResponse.redirect(
        new URL(`/auth/login?from=${req.nextUrl.pathname}`, req.url)
      )
    } else {
      return NextResponse.next()
    }
  }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  if (url.pathname.startsWith('/api')) return backend(req)
  else return frontend(req)
}
