import Button from 'components/Button'
import Card from 'components/Card'
import Dialog from 'components/Dialog'
import Layout from 'components/layout'
import Meta from 'components/Meta'
import { NextPage } from 'next'
import { useState } from 'react'

const ModalContent: React.FC = () => {
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th style={{ width: '3rem' }}>
                <input type="checkbox" />
              </th>
              <th>Relative Path</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td style={{ width: '3rem', textAlign: 'center' }}>
                <input type="checkbox" />
              </td>
              <td>/data/library/My Dress-Up Darling/Volume 1</td>
              <td>
                <input type="text" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer>
        <Button style="primary" wide={true}>
          Import
        </Button>
      </footer>
    </>
  )
}

const Debug: NextPage = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog
        title={'Manage Books - Book Title'}
        content={<ModalContent />}
        open={open}
        onOpenChange={(open) => setOpen(open)}
        size={'large'}
        noPadding={true}
      />
      <Meta title={'Debug'} />
      <Layout>
        <Card>
          <h1>Debug!</h1>
          <Button style={'primary'} onClick={() => setOpen(true)}>
            Open Modal
          </Button>
        </Card>
      </Layout>
    </>
  )
}

export default Debug
