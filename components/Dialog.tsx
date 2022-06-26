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
import { X } from 'lucide-react'
import styles from 'styles/Dialog.module.scss'

const Dialog = ({
  title,
  description,
  children,
  content,
  open,
  onOpenChange,
  ref,
}: {
  title: string
  description?: string
  children: React.ReactNode
  content: React.ReactNode
  setter?(val: boolean): void
  open?: boolean
  onOpenChange?(open: boolean): void
  ref?: HTMLElement
}) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Trigger asChild className={styles.trigger}>
        {children}
      </Trigger>
      <Portal className={styles.portal} container={ref}>
        <Overlay className={styles.overlay} />
        <Content className={styles.content}>
          <Title className={styles.title}>{title}</Title>
          <Description className={styles.description}>
            {description && description}
          </Description>
          {content}
          <Close className={styles.close}>
            <X />
          </Close>
        </Content>
      </Portal>
    </Root>
  )
}

export default Dialog
