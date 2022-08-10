import Button from 'components/Button'
import Card from 'components/Card'
import Dialog from 'components/Dialog'
import Layout from 'components/layout'
import Meta from 'components/Meta'
import { range } from 'lodash'
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
              <th>Name</th>
              <th>Path</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {range(1, 24).map((v: number) => {
              return (
                <tr key={v}>
                  <td style={{ width: '3rem', textAlign: 'center' }}>
                    <input type="checkbox" />
                  </td>
                  <td>Volume {v}</td>
                  <td>/data/library/My Dress-Up Darling/Volume {v}</td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
              )
            })}
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
