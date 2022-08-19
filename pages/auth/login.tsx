import Button from 'components/Button'
import Form from 'components/form/Form'
import { Input } from 'components/form/Input'
import Meta from 'components/Meta'
import { NextPage } from 'next'
import { signIn, SignInResponse } from 'next-auth/react'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from 'styles/pages/Authentication.module.scss'
import getErrorMessage from 'util/errors'
import * as yup from 'yup'

const Login: NextPage = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setLoading(true)
    const response = await signIn('credentials', {
      redirect: false,
      ...data,
    })
    if (response !== undefined) {
      if ((response as SignInResponse).error)
        setError(
          getErrorMessage((response as SignInResponse).error ?? '') ??
            'Unknown error'
        )
      else router.push('/')
      setLoading(false)
    }
  }

  const schema = yup
    .object()
    .shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required()

  return (
    <>
      <Meta title={'Login'} />
      <div className={styles.root}>
        <Image src="/logo.svg" alt="" />
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.form}>
          <Form
            onSubmit={handleSubmit}
            submitText={'Login'}
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
          </Form>
          <p className={styles.divider}>&mdash;</p>
          <Button
            onClick={() => router.push('/auth/register')}
            style={'secondary'}
            wide={true}
            type="button"
          >
            Register
          </Button>
        </div>
      </div>
    </>
  )
}

export default Login
