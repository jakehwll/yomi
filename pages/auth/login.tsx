import Button from 'components/Button'
import Text from 'components/input/Text'
import Meta from 'components/Meta'
import { NextPage } from 'next'
import { signIn, SignInResponse } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import styles from 'styles/pages/Authentication.module.scss'

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!email || !password) return
    const response: SignInResponse | undefined = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: window.location.origin ? window.location.origin : '/',
    })
    if (!response) return
    if ((response as SignInResponse).url)
      router.push((response as SignInResponse).url ?? '')
  }

  return (
    <>
      <Meta title={'Login'} />
      <div className={styles.root}>
        <h1>yomi</h1>
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
          <Button style={'primary'} wide={true} type="submit">
            Submit
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
