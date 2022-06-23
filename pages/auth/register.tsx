import Button from 'components/Button'
import Text from 'components/input/Text'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import styles from 'styles/pages/Authentication.module.scss'

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!email || !password) return setError('Missing error')
    if (password !== confirmPassword) return setError("Passwords don't match.")
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((json: any) => {
        if (!json.error) router.push('/auth/login')
        else setError(json.error)
      })
  }

  return (
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