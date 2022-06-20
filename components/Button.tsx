import cc from 'classcat'
import styles from 'styles/Button.module.scss'

const Button = ({
  children,
  onClick,
  style,
  opaque,
}: {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  style?: 'primary' | 'secondary' | 'success' | 'danger'
  opaque?: boolean
}) => {
  return (
    <button
      type="button"
      className={cc([
        styles.root,
        {
          [styles.opaque]: !opaque,
          [`${styles[style ? style : 'transparent']}`]: style,
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
