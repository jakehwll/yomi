import Button from 'components/Button'
import Text from 'components/input/Text'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import styles from 'styles/pages/Authentication.module.scss'

const Login: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!username || !password) return
    console.log({
      username: username,
      password: password,
    })
  }

  return (
    <div className={styles.root}>
      <h1>yomi</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Text
          id={'username'}
          name={'username'}
          value={username}
          onChange={(event) =>
            setUsername((event.target as HTMLInputElement).value)
          }
          label={'Username'}
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
  )
}

export default Login
