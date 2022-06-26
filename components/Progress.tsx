import { useNProgress } from '@tanem/react-nprogress'
import cc from 'classcat'
import styles from 'styles/Progress.module.scss'

interface LoadingProps {
  isRouteChanging: boolean
}

const Loading: React.FC<LoadingProps> = ({ isRouteChanging }: LoadingProps) => {
  const { isFinished, progress } = useNProgress({
    isAnimating: isRouteChanging,
  })

  return (
    <>
      <div
        className={cc([
          styles.root,
          {
            [styles.loading]: !isFinished,
          },
        ])}
      >
        <div
          className={styles.bar}
          style={{ marginLeft: `${(-1 + progress) * 100}%` }}
        ></div>
      </div>
    </>
  )
}

export default Loading
