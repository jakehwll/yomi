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

const DropdownItem = ({ children }: { children: React.ReactNode }) => {
  return <Item className={styles.item}>{children}</Item>
}

export { Dropdown, DropdownItem }
