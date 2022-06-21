import {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-alert-dialog'
import styles from 'styles/AlertDialog.module.scss'
import Button from './Button'

const AlertDialog = ({
  children,
  open,
  title,
  description,
  onOpenChange,
  onCancel = () => {},
  onSuccess = () => {},
}: {
  children?: React.ReactNode
  open?: boolean
  title: string
  description: string
  onOpenChange?(open: boolean): void
  onCancel?(): void
  onSuccess?(): void
}) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      {children && (
        <Trigger asChild>
          <div>{children}</div>
        </Trigger>
      )}
      <Portal>
        <Overlay className={styles.overlay} />
        <Content className={styles.content}>
          <header>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </header>
          <footer>
            <Cancel onClick={onCancel} asChild>
              <div>
                <Button style={'light'}>Cancel</Button>
              </div>
            </Cancel>
            <Action onClick={onSuccess} asChild>
              <div>
                <Button style={'danger'}>Delete</Button>
              </div>
            </Action>
          </footer>
        </Content>
      </Portal>
    </Root>
  )
}

export default AlertDialog
