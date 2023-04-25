import backCard from '../assets/back-card.png'
import { useState } from 'react'

interface CardImageProps {
  src: string
  onClick: () => void
  disable: boolean
}

export const CardImage = ({ src, onClick, disable }: CardImageProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="rounded-xl overflow-hidden drop-shadow-md select-none"
      onClick={() => {
        if (disable || open) {
          return
        }
        onClick && onClick()
        setOpen(true)
      }}
    >
      {open ? (
        <img className="w-40 h-64 object-cover" src={src} />
      ) : (
        <img className="w-40 h-64" srcSet={backCard} />
      )}
    </div>
  )
}
