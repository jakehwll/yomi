import Button from 'components/Button'
import Text from 'components/input/Text'
import Meta from 'components/Meta'
import { NextPage } from 'next'
import { signIn, SignInResponse, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import styles from 'styles/pages/Authentication.module.scss'

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const session = useSession()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!email || !password) return
    setLoading(true)
    const response = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    })
    if (response !== undefined) {
      if ((response as SignInResponse).error)
        setError((response as SignInResponse).error ?? '')
      else {
        router.push('/')
      }
      setLoading(false)
    }
  }

  return (
    <>
      <Meta title={'Login'} />
      <div className={styles.root}>
        <h1>yomi</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <Text
            id={'email'}
            name={'email'}
            value={email}
            onChange={(event) =>
              setEmail((event.target as HTMLInputElement).value)
            }
            label={'Email'}
          />
          <Text
            id={'password'}
            name={'password'}
            value={password}
            type={'password'}
            onChange={(event) =>
              setPassword((event.target as HTMLInputElement).value)
            }
            label={'Password'}
          />
          <Button style={'primary'} wide={true} type="submit" loading={loading}>
            Login
          </Button>
          <p className={styles.divider}>&mdash;</p>
          <Button
            onClick={() => router.push('/auth/register')}
            style={'secondary'}
            wide={true}
            type="button"
          >
            Register
          </Button>
        </form>
      </div>
    </>
  )
}

export default Login
