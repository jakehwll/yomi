import { Range, Root, Thumb, Track } from '@radix-ui/react-slider'
import styles from 'styles/input/Slider.module.scss'

interface SliderProps {
  value: number
  max?: number
  onValueChange(value: Array<number>): void
}

const Slider: React.FC<SliderProps> = ({
  value,
  max,
  onValueChange,
}: SliderProps) => {
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

export default Slider
