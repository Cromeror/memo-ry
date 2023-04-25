import { ScoreBoard } from '../components/ScoreBoard'
import { useAppServices } from '../components/AppServiceProvider'
import { useEffect, useState } from 'react'
import { Card } from '../abstractions/domine/Card'
import { Board, BoardState } from '../components/Board'
import { Modal } from '../components/Modal'

const shuffleCards = (cards: Card[]) => {
  return cards.sort(() => Math.random() - 0.5)
}

export const Stage = () => {
  const { memoryApiService } = useAppServices()
  const [data, setData] = useState<Card[]>([])
  const [score, setScore] = useState({ won: 0, lose: 0 })
  const [showEndGame, setShowEndGame] = useState(false)

  useEffect(() => {
    memoryApiService.getCards(9).then((cards) => {
      const duplicatedCards = [...cards, ...cards]
      setData(shuffleCards(duplicatedCards))
    })
  }, [setData])

  if (data.length < 1) {
    return <>'Loading..'</>
  }

  const afterThePlayBehavior = ({ lastMove, status }: BoardState) => {
    setScore(({ won, lose }) => ({
      lose: lastMove === 'LOSE' ? lose + 1 : lose,
      won: lastMove === 'WON' ? won + 1 : won,
    }))

    if (status === 'FINISHED') {
      setShowEndGame(true)
    }
  }

  return (
    <div>
      <ScoreBoard fails={score.lose} points={score.won} />
      <Board cards={data} afterThePlay={afterThePlayBehavior} />
      {showEndGame ? <Modal>Este es un modal</Modal> : false}
    </div>
  )
}
