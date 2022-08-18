import { yupResolver } from '@hookform/resolvers/yup'
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
  className?: string
  schema?: any
}

const Form = ({
  defaultValues,
  children,
  onSubmit,
  resetSubmit = false,
  submitText,
  loading,
  className,
  schema,
}: FormProps): ReactElement => {
  const { formState, handleSubmit, reset, register } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
    resolver: schema && yupResolver(schema),
  })
  const { isDirty, isValid } = formState

  const _handleSubmit = (event: { [key: string]: any }) => {
    if (resetSubmit) reset()
    return onSubmit(event)
  }

  return (
    <form className={className} onSubmit={handleSubmit(_handleSubmit)}>
      {React.Children.map(children, (child) => {
        if (!child) return
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: register,
                errors: formState.errors,
                key: child.props.name,
              },
            })
          : child
      })}
      <Button
        type="submit"
        style="primary"
        wide={true}
        loading={loading}
        disabled={!isDirty || !isValid}
      >
        {submitText ? submitText : 'Submit'}
      </Button>
    </form>
  )
}

export default Form
