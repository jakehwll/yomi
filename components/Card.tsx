import styles from 'styles/Card.module.scss'

interface CardProps {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children }: CardProps) => {
  return <div className={styles.root}>{children}</div>
}

export default Card
