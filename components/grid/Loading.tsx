import { Loader2 } from 'lucide-react'
import styles from 'styles/grid/Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Loader2 />
    </div>
  )
}

export default Loading
