import Form from 'components/form/Form'
import { Input } from 'components/form/Input'
import Meta from 'components/Meta'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from 'styles/pages/Authentication.module.scss'
import getErrorMessage from 'util/errors'
import * as yup from 'yup'

const Login: NextPage = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = (data: any) => {
    setLoading(true)
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => {
        setLoading(false)
        return response.json()
      })
      .then((json: any) => {
        if (json && !json.error) router.push('/auth/login')
        setError(getErrorMessage(json.statusCode) || json.code)
      })
  }

  const schema = yup
    .object()
    .shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required(),
    })
    .required()

  return (
    <>
      <Meta title={'Register'} />
      <div className={styles.root}>
        <img src="/logo.svg" alt="" />
        {error && <div className={styles.error}>{error}</div>}
        <Form
          className={styles.form}
          onSubmit={handleSubmit}
          loading={loading}
          schema={schema}
        >
          <Input label="Email" title="Email" name="email" />
          <Input
            label="Password"
            title="Password"
            name="password"
            type="password"
          />
          <Input
            label="Confirm Password"
            title="Confirm Password"
            name="confirmPassword"
            type="password"
          />
        </Form>
        <p className={styles.divider}>
          Already got an account?{' '}
          <Link href="/auth/login" passHref>
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Login
