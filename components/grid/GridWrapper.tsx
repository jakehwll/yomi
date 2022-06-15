import styles from 'styles/grid/GridWrapper.module.scss'

const GridWrapper = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.root}>{children}</div>
}

export default GridWrapper
