import cc from 'classcat'
import { ChangeEvent } from 'react'
import styles from 'styles/input/Input.module.scss'

interface InputProps
  extends Partial<Omit<HTMLInputElement, 'id' | 'required' | 'onchange'>> {
  register?: any
  name: string
  label?: string
  onChange?(event: ChangeEvent): void
  required?: boolean
  errors?: any
}

interface SelectProps
  extends Partial<
    Omit<HTMLSelectElement, 'options' | 'id' | 'required' | 'onchange'>
  > {
  register?: any
  name: string
  options: Array<string | [string, string]>
  label?: string
  onChange?(event: ChangeEvent): void
  required?: boolean
  errors?: any
}

export function Input({
  register,
  name,
  label,
  required,
  onChange,
  errors,
  ...rest
}: InputProps) {
  return (
    <div className={styles.root}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        className={cc([styles.input, { [styles.error]: errors[name] }])}
        id={name}
        {...register(name, {
          require: required,
          onChange: (event: ChangeEvent) => onChange && onChange(event),
        })}
        aria-invalid={errors[name] ? 'true' : 'false'}
        {...rest}
      />
    </div>
  )
}

export function Select({
  register,
  options,
  label,
  name,
  onChange,
  errors,
  ...rest
}: SelectProps) {
  return (
    <div className={styles.root}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <select
        className={cc([styles.select, { [styles.error]: errors[name] }])}
        {...register(name, {
          onChange: (event: ChangeEvent) => onChange && onChange(event),
        })}
        {...rest}
      >
        <option selected disabled></option>
        {options.map((value) =>
          Array.isArray(value) ? (
            <option key={value[0]} value={value[0]}>
              {value[1]}
            </option>
          ) : (
            <option key={value} value={value}>
              {value}
            </option>
          )
        )}
      </select>
    </div>
  )
}
