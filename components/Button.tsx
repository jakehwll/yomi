import cc from 'classcat'
import { Loader2 } from 'lucide-react'
import styles from 'styles/Button.module.scss'

interface ButtonProps {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  style?:
    | 'primary'
    | 'secondary'
    | 'light'
    | 'dark'
    | 'success'
    | 'danger'
    | 'transparent'
  opaque?: boolean
  wide?: boolean
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  style = 'transparent',
  wide,
  type,
  loading,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type ?? 'button'}
      className={cc([
        styles.root,
        {
          [`${styles[style]}`]: style,
          [styles.wide]: wide,
          [styles.loading]: loading,
          [styles.disabled]: disabled,
        },
      ])}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        if (loading) return
        onClick && onClick(event)
      }}
    >
      {loading && <Loader2 />}
      {children}
    </button>
  )
}

const ButtonGroup = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.group}>{children}</div>
}

export default Button
export { ButtonGroup }
