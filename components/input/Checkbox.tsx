import { Label } from '@radix-ui/react-label'
import { ChangeEventHandler } from 'react'
import styles from 'styles/input/Checkbox.module.scss'

interface CheckboxProps {
  label: string
  name: string
  value: boolean
  id: string
  onChange: ChangeEventHandler
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  value,
  id,
  onChange,
}: CheckboxProps) => {
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
