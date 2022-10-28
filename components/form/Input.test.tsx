import { renderWithForm } from './Form.test'
import { Input, Select } from './Input'

describe('Components -> Form -> Input', () => {
  it('renders', () => {
    renderWithForm(<Input name="Test" />)
  })
})

describe('Components -> Form -> Select', () => {
  it('renders', () => {
    renderWithForm(<Select name={'Test'} options={[]} />)
  })
})
