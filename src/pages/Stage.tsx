import { Board } from '../components/Board'
import { ScoreBoard } from '../components/ScoreBoard'
import { useAppServices } from '../components/AppServiceProvider'
import { useEffect, useState } from 'react'
import { Card } from '../abstractions/domine/Card'

const shuffleCards = (cards: Card[]) => {
  return [...cards, ...cards].sort(() => Math.random() - 0.5)
}

export const Stage = () => {
  const { memoryApiService } = useAppServices()
  const [data, setData] = useState<Card[]>([])

  useEffect(() => {
    memoryApiService.getCards(9).then((cards) => {
      setData(cards)
    })
  }, [])

  const cards = shuffleCards(data)

  return (
    <div>
      <ScoreBoard fails={5} points={4} />
      <Board cards={cards} />
    </div>
  )
}
