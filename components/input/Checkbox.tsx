import { Label } from '@radix-ui/react-label'
import { ChangeEventHandler } from 'react'
import styles from 'styles/input/Checkbox.module.scss'

const Checkbox = ({
  label,
  name,
  value,
  id,
  onChange,
}: {
  label: string
  name: string
  value: boolean
  id: string
  onChange: ChangeEventHandler
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.input}>
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={value}
          onChange={onChange}
        />
      </div>
      <Label className={styles.label} htmlFor={name}>
        {label}
      </Label>
    </div>
  )
}

export default Checkbox
