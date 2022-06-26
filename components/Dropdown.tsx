import { Content, Item, Root, Trigger } from '@radix-ui/react-dropdown-menu'
import styles from 'styles/Dropdown.module.scss'

interface DropdownProps {
  children: React.ReactNode
  content: React.ReactNode
  open?: boolean
  onOpenChange?(open: boolean): void
}

interface DropdownItemProps {
  children: React.ReactNode
  onSelect(): void
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  content,
  open,
  onOpenChange,
}: DropdownProps) => {
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

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onSelect,
}: DropdownItemProps) => {
  return (
    <Item className={styles.item} onSelect={onSelect} textValue={'test'}>
      {children}
    </Item>
  )
}

export { Dropdown, DropdownItem }
