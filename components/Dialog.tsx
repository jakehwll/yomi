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
import { X } from 'react-feather'
import styles from 'styles/Dialog.module.scss'

const Dialog = ({
  title,
  children,
  content,
  open,
  onOpenChange,
}: {
  title: string
  children: React.ReactNode
  content: React.ReactNode
  setter?(val: boolean): void
  open?: boolean
  onOpenChange?(open: boolean): void
}) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Trigger asChild className={styles.trigger}>
        {children}
      </Trigger>
      <Portal className={styles.portal}>
        <Overlay className={styles.overlay} />
        <Content className={styles.content}>
          <Title className={styles.title}>{title}</Title>
          <Description className={styles.description}>{content}</Description>
          <Close className={styles.close}>
            <X />
          </Close>
        </Content>
      </Portal>
    </Root>
  )
}

export default Dialog
