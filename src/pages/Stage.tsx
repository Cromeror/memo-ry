import { ScoreBoard } from '../components/ScoreBoard'
import { useAppServices } from '../components/AppServiceProvider'
import { useEffect, useRef, useState } from 'react'
import { Card } from '../abstractions/domine/Card'
import { Board, BoardState } from '../components/Board'
import { Modal } from '../components/Modal'
import cupImage from '../assets/cup-animation.gif'
import { Player } from '../abstractions/domine/Player'
import { LoadingScreen } from '../components/LoadingScreen'

const shuffleCards = (cards: Card[]) => {
  return cards.sort(() => Math.random() - 0.5)
}

export const Stage = () => {
  const { memoryApiService, localStorageService } = useAppServices()
  const player = useRef<Player | null>(null)
  const [data, setData] = useState<Card[]>([])
  const [score, setScore] = useState({ won: 0, lose: 0 })
  const [showEndGame, setShowEndGame] = useState(false)

  useEffect(() => {
    localStorageService.loadPlayer().then((x) => (player.current = x))
  }, [])

  useEffect(() => {
    memoryApiService.getCards(9).then((cards) => {
      const duplicatedCards = [...cards, ...cards]
      setData(shuffleCards(duplicatedCards))
    })
  }, [setData])

  if (data.length < 1) {
    return <LoadingScreen />
  }

  const reStartGame = () => {
    window.location.href = '/stage'
  }

  const afterPlayerMoveBehavior = ({ lastMove, status }: BoardState) => {
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
      <Board cards={data} afterMove={afterPlayerMoveBehavior} />
      {showEndGame ? (
        <Modal>
          <div className="bg-white rounded p-8 flex flex-col items-center no-select gap-4 select-none">
            <img srcSet={cupImage} alt="cup image" className="w-1/4" />
            <p className="text-3xl font-semibold text-slate-700">
              Congrats {player.current?.name}
            </p>
            <button
              type="button"
              className="uppercase rounded font-semibold py-2 px-4 bg-orange-600 text-slate-50"
              onClick={() => reStartGame()}
            >
              Play again
            </button>
          </div>
        </Modal>
      ) : (
        false
      )}
    </div>
  )
}
