import Button from 'components/Button'
import Text from 'components/input/Text'
import { NextPage } from 'next'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import styles from 'styles/pages/Authentication.module.scss'

const Login: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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
        <Text
          id={'confirm-password'}
          name={'confirm-password'}
          value={confirmPassword}
          type={'password'}
          onChange={(event) =>
            setConfirmPassword((event.target as HTMLInputElement).value)
          }
          label={'Confirm Password'}
        />
        <Button style={'primary'} wide={true} type="submit">
          Submit
        </Button>
        <p className={styles.divider}>
          Already got an account?{' '}
          <Link href="/auth/login" passHref>
            <a>Login</a>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
