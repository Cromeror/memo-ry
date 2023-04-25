import backCard from '../assets/back-card.png'
import { useEffect, useState } from 'react'

interface CardImageProps {
  src: string
  onClick: () => void
  disable: boolean
  upsideDown: boolean
}

export const CardImage = ({
  src,
  onClick,
  disable,
  upsideDown,
}: CardImageProps) => {
  const [open, setOpen] = useState(false)

  const onClickBehavior = () => {
    if (disable || open) {
      return
    }
    onClick && onClick()
    setOpen(true)
  }

  useEffect(() => {
    if (upsideDown) {
      setOpen(false)
    }
  }, [upsideDown])

  return (
    <div
      className="rounded-xl overflow-hidden drop-shadow-md select-none"
      onClick={onClickBehavior}
    >
      {open ? (
        <img className="w-40 h-64 object-cover" src={src} />
      ) : (
        <img className="w-40 h-64" srcSet={backCard} />
      )}
    </div>
  )
}
