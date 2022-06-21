import cc from 'classcat'
import { Loader } from 'react-feather'
import styles from 'styles/Button.module.scss'

const Button = ({
  children,
  onClick,
  style = 'transparent',
  wide,
  type,
  loading,
}: {
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
}) => {
  return (
    <button
      type={type ?? 'button'}
      className={cc([
        styles.root,
        {
          [`${styles[style]}`]: style,
          [styles.wide]: wide,
          [styles.loading]: loading,
        },
      ])}
      onClick={onClick}
    >
      {loading && <Loader />}
      {children}
    </button>
  )
}

const ButtonGroup = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.group}>{children}</div>
}

export default Button
export { ButtonGroup }
