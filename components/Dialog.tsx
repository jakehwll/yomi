import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog'
import cc from 'classcat'
import { X } from 'lucide-react'
import styles from 'styles/Dialog.module.scss'

interface DialogProps {
  title: string
  description?: string
  children?: React.ReactNode
  content: React.ReactNode
  setter?(val: boolean): void
  open?: boolean
  onOpenChange?(open: boolean): void
  ref?: HTMLElement
  size?: 'small' | 'regular' | 'large'
  noPadding?: boolean
}

const Dialog: React.FC<DialogProps> = ({
  title,
  description,
  children,
  content,
  open,
  onOpenChange,
  ref,
  size = 'regular',
  noPadding = false,
}: DialogProps) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Trigger asChild className={styles.trigger}>
        {children}
      </Trigger>
      <Portal className={styles.portal} container={ref}>
        <Overlay className={styles.overlay} />
        <Content
          className={cc([
            styles.content,
            {
              [styles.large]: size === 'large',
              [styles.no_padding]: noPadding === true,
            },
          ])}
        >
          <header>
            {title && <Title className={styles.title}>{title}</Title>}
            {description && (
              <Description className={styles.description}>
                {description}
              </Description>
            )}
          </header>
          <section>{content}</section>
          <Close className={styles.close}>
            <X />
          </Close>
        </Content>
      </Portal>
    </Root>
  )
}

export default Dialog
