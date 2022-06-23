import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const RequiresAuth = () => {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session === null) router.push('/auth/login')
  }, [session])

  return <></>
}

export default RequiresAuth
