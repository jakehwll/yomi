import styles from 'styles/Card.module.scss'

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.root}>{children}</div>
}

export default Card
