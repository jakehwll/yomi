import Card from 'components/Card'
import Form from 'components/form/Form'
import { Input } from 'components/form/Input'
import Layout from 'components/layout'
import Meta from 'components/Meta'
import { NextPage } from 'next'

const ChangePassword = () => {
  const handleSubmit = (data: any) => console.log(data)

  return (
    <Card>
      <h2>Change Password</h2>
      <Form onSubmit={handleSubmit} submitText={'Change Password'}>
        <Input label="Password" name={'password'} />
        <Input label="Confirm Password" name={'confirm-password'} />
      </Form>
    </Card>
  )
}

const UserProfile: NextPage = () => {
  return (
    <>
      <Meta title={'User Profile'} />
      <Layout>
        <ChangePassword />
      </Layout>
    </>
  )
}

export default UserProfile
