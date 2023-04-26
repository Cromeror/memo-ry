import { PortalComponent } from './PortalComponent'

interface ModalProps {
  children: any
}

export const Modal = ({ children }: ModalProps) => {
  return (
    <PortalComponent id="app-modal">
      <div className="absolute bg-black/80 top-0 left-0 w-screen h-screen flex justify-center items-center">
        {children}
      </div>
    </PortalComponent>
  )
}
