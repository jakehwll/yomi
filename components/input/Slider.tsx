import { Range, Root, Thumb, Track } from '@radix-ui/react-slider'
import styles from 'styles/input/Slider.module.scss'

const SliderEl = ({
  value,
  max,
  onValueChange,
}: {
  value: number
  max?: number
  onValueChange(value: Array<number>): void
}) => {
  return (
    <Root
      defaultValue={[value]}
      value={[value - 1]}
      min={0}
      max={max ?? 100}
      step={1}
      aria-label="Volume"
      className={styles.root}
      onValueChange={onValueChange}
    >
      <Track className={styles.track}>
        <Range className={styles.range} />
      </Track>
      <Thumb className={styles.thumb} />
    </Root>
  )
}

export default SliderEl
