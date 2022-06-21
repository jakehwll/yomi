import { Content, Item, Root, Trigger } from '@radix-ui/react-dropdown-menu'
import styles from 'styles/Dropdown.module.scss'

const Dropdown = ({
  children,
  content,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  content: React.ReactNode
  open?: boolean
  onOpenChange?(open: boolean): void
}) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Trigger className={styles.trigger} asChild>
        {/* extra div as we cannot use internal button el?? */}
        <div>{children}</div>
      </Trigger>
      <Content className={styles.content}>{content}</Content>
    </Root>
  )
}

const DropdownItem = ({
  children,
  onSelect,
}: {
  children: React.ReactNode
  onSelect(): void
}) => {
  return (
    <Item className={styles.item} onSelect={onSelect} textValue={'test'}>
      Test
    </Item>
  )
}

export { Dropdown, DropdownItem }
