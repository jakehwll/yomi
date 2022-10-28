import styles from 'styles/layout/Content.module.scss'

interface ContentProps {
  children?: React.ReactNode
}

const Content: React.FC<ContentProps> = ({ children }: ContentProps) => {
  return <main className={styles.root}>{children}</main>
}

export default Content
