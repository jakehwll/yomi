import { Loader } from 'react-feather'
import styles from 'styles/grid/Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Loader />
    </div>
  )
}

export default Loading
