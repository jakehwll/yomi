import { render } from '@testing-library/react'
import Form from './Form'

type RenderParams = Parameters<typeof render>

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    handleSubmit: (func: () => Promise<any>) => () => func(),
    register: jest.fn(),
    formState: {
      isDirty: true,
      isValid: true,
    },
    errors: { Test: {} },
  }),
}))

const renderWithForm = (children: RenderParams[0], options?: RenderParams[1]) =>
  render(<Form onSubmit={() => {}}>{children}</Form>, options)

describe('Components -> Form', () => {
  it('renders', () => {
    render(<Form onSubmit={() => {}}></Form>)
  })
})

export { renderWithForm }
