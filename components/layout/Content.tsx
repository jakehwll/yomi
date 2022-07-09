import styles from 'styles/layout/Content.module.scss'

const Content: React.FC = ({ children }: { children?: React.ReactNode }) => {
  return <main className={styles.root}>{children}</main>
}

export default Content
