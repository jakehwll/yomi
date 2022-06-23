// import { getToken } from 'next-auth/jwt'
// import { NextRequest, NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// TODO. API Authentication

export async function middleware(req: NextRequest) {
  // if (!req.url.includes('/protected-url')) return NextResponse.next()
  // const session = await getToken({ req, secret: process.env.SECRET })
  // if (!session) return NextResponse.redirect('/api/auth/signin')
  // return NextResponse.next()
}
