import cc from 'classcat'
import styles from 'styles/grid/GridWrapper.module.scss'

interface GridWrapperProps {
  padding?: boolean
  children?: React.ReactNode
}

const GridWrapper: React.FC<GridWrapperProps> = ({
  padding = false,
  children,
}: GridWrapperProps) => {
  return (
    <div
      className={cc([
        styles.root,
        {
          [styles.padding]: padding,
        },
      ])}
    >
      {children}
    </div>
  )
}

export default GridWrapper
