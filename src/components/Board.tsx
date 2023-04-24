import { Card } from '../abstractions/domine/Card'
import { CardImage } from './CardImage'

interface BoardProps {
  cards: Card[]
}

export const Board = ({ cards }: BoardProps) => {
  return (
    <div className="grid gap-2 grid-cols-6 w-fit m-auto">
      {cards.map((card, index) => {
        return <CardImage key={index} src={card.image.url} />
      })}
    </div>
  )
}
