import Button from 'components/Button'
import Card from 'components/Card'
import Form from 'components/form/Form'
import { Input } from 'components/form/Input'
import Layout from 'components/layout'
import Meta from 'components/Meta'
import { NextPage } from 'next'
import { signOut } from 'next-auth/react'

const ChangeEmail = () => {
  const handleSubmit = (data: any) => console.log(data)

  return (
    <Card>
      <h2>Change Email</h2>
      <Form onSubmit={handleSubmit} submitText={'Change Email'}>
        <Input label="Email" name={'email'} disabled={true} />
      </Form>
    </Card>
  )
}

const ChangePassword = () => {
  const handleSubmit = (data: any) => console.log(data)

  return (
    <Card>
      <h2>Change Password</h2>
      <Form onSubmit={handleSubmit} submitText={'Change Password'}>
        <Input
          label="Password"
          type="password"
          name={'password'}
          disabled={true}
        />
        <Input
          label="Confirm Password"
          type="password"
          name={'confirm-password'}
          disabled={true}
        />
      </Form>
    </Card>
  )
}

const UserProfile: NextPage = () => {
  return (
    <>
      <Meta title={'User Profile'} />
      <Layout>
        <ChangeEmail />
        <ChangePassword />
        <Card>
          <h2>Danger Zone</h2>
          <Button style={'danger'} wide={true} onClick={() => signOut()}>
            Sign Out
          </Button>
        </Card>
      </Layout>
    </>
  )
}

export default UserProfile
