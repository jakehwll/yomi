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

const AlertDialog = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?(open: boolean): void
}) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Trigger asChild>{children}</Trigger>
      <Portal>
        <Overlay />
        <Content>
          <Title></Title>
          <Description></Description>
          <Cancel asChild>
            <button type="button">Cancel</button>
          </Cancel>
          <Action />
        </Content>
      </Portal>
    </Root>
  )
}

export default AlertDialog
