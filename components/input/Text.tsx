import { Label } from '@radix-ui/react-label'
import { ChangeEventHandler } from 'react'
import styles from 'styles/input/Text.module.scss'

const Text = ({
  label,
  id,
  name,
  value,
  onChange,
}: {
  label?: string
  id: string
  name: string
  value: string
  onChange: ChangeEventHandler
}) => {
  return (
    <div className={styles.root}>
      {label && (
        <div className={styles.label}>
          <Label htmlFor={name}>{label}</Label>
        </div>
      )}
      <div className={styles.input}>
        <input
          type="text"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default Text
