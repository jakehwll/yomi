import cc from 'classcat'
import styles from 'styles/Button.module.scss'

const Button = ({
  children,
  onClick,
  style,
  opaque,
  wide,
  type,
}: {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  style?: 'primary' | 'secondary' | 'success' | 'danger'
  opaque?: boolean
  wide?: boolean
  type?: 'button' | 'submit' | 'reset'
}) => {
  return (
    <button
      type={type ?? 'button'}
      className={cc([
        styles.root,
        {
          [`${styles[style ? style : 'transparent']}`]: style,
          [styles.opaque]: opaque,
          [styles.wide]: wide,
        },
      ])}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const ButtonGroup = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.group}>{children}</div>
}

export default Button
export { ButtonGroup }
