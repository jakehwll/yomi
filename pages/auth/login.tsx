import Button from 'components/Button'
import Text from 'components/input/Text'
import Meta from 'components/Meta'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import styles from 'styles/pages/Authentication.module.scss'

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!email || !password) return
    console.log({
      username: email,
      password: password,
    })
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
            label={'email'}
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
