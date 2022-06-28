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
}

const Form = ({
  defaultValues,
  children,
  onSubmit,
  submitText,
}: FormProps): ReactElement => {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button type="submit" style="primary" wide={true}>
        {submitText ? submitText : 'Submit'}
      </Button>
    </form>
  )
}

export default Form
