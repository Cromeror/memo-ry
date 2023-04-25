import { ScoreBoard } from '../components/ScoreBoard'
import { useAppServices } from '../components/AppServiceProvider'
import { useEffect, useState } from 'react'
import { Card } from '../abstractions/domine/Card'
import { Board, BoardState } from '../components/Board'

const shuffleCards = (cards: Card[]) => {
  return cards.sort(() => Math.random() - 0.5)
}

export const Stage = () => {
  const { memoryApiService } = useAppServices()
  const [data, setData] = useState<Card[]>([])
  const [score, setScore] = useState({ won: 0, lose: 0 })

  useEffect(() => {
    memoryApiService.getCards(9).then((cards) => {
      const duplicatedCards = [...cards, ...cards]
      setData(shuffleCards(duplicatedCards))
    })
  }, [setData])

  if (data.length < 1) {
    return 'Loading..'
  }

  const afterThePlayBehavior = ({ lastMove }: BoardState) => {
    if (lastMove === 'LOSE') {
      setScore(({ won, lose }) => ({ lose: lose + 1, won }))
    }
    if (lastMove === 'WON') {
      setScore(({ won, lose }) => ({ lose, won: won + 1 }))
    }
  }

  return (
    <div>
      <ScoreBoard fails={score.lose} points={score.won} />
      <Board cards={data} afterThePlay={afterThePlayBehavior} />
    </div>
  )
}
