import { PortalComponent } from './PortalComponent'

interface ModalProps {
  children: any
}

export const Modal = ({ children }: ModalProps) => {
  return <PortalComponent id="app-modal">{children}</PortalComponent>
}
