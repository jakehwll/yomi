import styles from 'styles/grid/GridWrapper.module.scss'

interface GridWrapperProps {
  children?: React.ReactNode
}

const GridWrapper: React.FC<GridWrapperProps> = ({
  children,
}: GridWrapperProps) => {
  return <div className={styles.root}>{children}</div>
}

export default GridWrapper
