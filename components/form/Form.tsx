import Button from 'components/Button'
import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'

interface FormProps {
  defaultValues?: {
    [val: string]: string
  }
  children: React.ReactElement | Array<React.ReactElement>
  onSubmit(event: any): void
  submitText?: string
  loading?: boolean
  resetSubmit?: boolean
}

const Form = ({
  defaultValues,
  children,
  onSubmit,
  resetSubmit = false,
  submitText,
  loading,
}: FormProps): ReactElement => {
  const methods = useForm({ defaultValues })
  const { handleSubmit, reset } = methods

  const _handleSubmit = (event: { [key: string]: any }) => {
    if (resetSubmit) reset()
    return onSubmit(event)
  }

  return (
    <form onSubmit={handleSubmit(_handleSubmit)}>
      {React.Children.map(children, (child) => {
        if (!child) return
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child
      })}
      <Button type="submit" style="primary" wide={true} loading={loading}>
        {submitText ? submitText : 'Submit'}
      </Button>
    </form>
  )
}

export default Form
