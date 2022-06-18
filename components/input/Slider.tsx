import * as Slider from '@radix-ui/react-slider'
import styles from 'styles/input/Slider.module.scss'

const SliderEl = () => {
  return (
    <Slider.Root
      defaultValue={[50]}
      max={100}
      step={1}
      aria-label="Volume"
      className={styles.root}
    >
      <Slider.Track className={styles.track}>
        <Slider.Range className={styles.range} />
      </Slider.Track>
      <Slider.Thumb className={styles.thumb} />
    </Slider.Root>
  )
}

export default SliderEl
