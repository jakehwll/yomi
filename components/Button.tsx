import styles from 'styles/Button.module.scss'

const Button = ({
  children,
  onClick,
}: {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button type="button" className={styles.root} onClick={onClick}>
      {children}
    </button>
  )
}

const ButtonGroup = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.group}>{children}</div>
}

export default Button
export { ButtonGroup }
