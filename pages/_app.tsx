import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import 'styles/globals.scss'

// Delete this if runtime JavaScript is needed:
export const config = {
  unstable_runtimeJS: false,
}

function Yomi({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default Yomi
