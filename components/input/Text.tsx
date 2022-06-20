import { ChangeEventHandler } from 'react'
import styles from 'styles/input/Text.module.scss'

const Text = ({
  label,
  id,
  name,
  value,
  onChange,
}: {
  label: string
  id: string
  name: string
  value: string
  onChange: ChangeEventHandler
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.label}>
        <label htmlFor={name}>{label}</label>
      </div>
      <div className={styles.input}>
        <input type="text" name={name} id={id} />
      </div>
    </div>
  )
}

export default Text
