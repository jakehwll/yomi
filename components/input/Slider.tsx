import { Range, Root, Thumb, Track } from '@radix-ui/react-slider'
import styles from 'styles/input/Slider.module.scss'

const SliderEl = () => {
  return (
    <Root
      defaultValue={[50]}
      max={100}
      step={1}
      aria-label="Volume"
      className={styles.root}
    >
      <Track className={styles.track}>
        <Range className={styles.range} />
      </Track>
      <Thumb className={styles.thumb} />
    </Root>
  )
}

export default SliderEl
