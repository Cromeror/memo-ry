import backCard from '../assets/back-card.png'
import { useState } from 'react'

interface CardImageProps {
  src: string
}

export const CardImage = ({ src }: CardImageProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="rounded-xl overflow-hidden drop-shadow-md select-none"
      onClick={() => {
        setOpen((r) => !r)
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
