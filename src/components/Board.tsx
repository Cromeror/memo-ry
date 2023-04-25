import { Card } from '../abstractions/domine/Card'
import { CardImage } from './CardImage'
import { useCallback, useEffect, useRef, useState } from 'react'

interface BoardProps {
  cards: Card[]
  afterThePlay: (boardState: BoardState) => void
}

interface CardState {
  card: Card
  isRevealed: boolean
}

export interface BoardState {
  lastMove: 'WON' | 'LOSE' | 'NONE'
}

const isTheSameCard = ([c1, c2]: Card[]) => c1.uuid === c2.uuid

export const Board = ({ cards, afterThePlay }: BoardProps) => {
  const DEFAULT_SELECTION_STATE = {
    firstSelection: null,
    secondSelection: null,
    isWin: false,
  }
  const boardState = useRef<BoardState>({ lastMove: 'NONE' })
  const [selectionState, setSelectionState] = useState<{
    firstSelection: Card | null
    secondSelection: Card | null
    isWin: boolean
  }>(DEFAULT_SELECTION_STATE)

  const cardsOnBoard: CardState[] = cards.map((card) => ({
    card,
    isRevealed: false,
  }))

  const resetCurrentSelection = () => {
    setSelectionState(DEFAULT_SELECTION_STATE)
  }

  const onFailed = () => {
    boardState.current = {
      lastMove: 'LOSE',
    }
  }

  const onWinner = () => {
    boardState.current = {
      lastMove: 'WON',
    }
  }

  const selectionHandler = (cardState: CardState) => {
    const { firstSelection, secondSelection } = selectionState

    if (firstSelection && secondSelection) {
      return
    }

    if (!firstSelection && !secondSelection) {
      setSelectionState({
        ...selectionState,
        firstSelection: cardState.card,
      })
      return
    }

    setSelectionState({
      ...selectionState,
      secondSelection: cardState.card,
      isWin: isTheSameCard([firstSelection!, cardState.card]),
    })
  }

  useEffect(() => {
    const { firstSelection, secondSelection, isWin } = selectionState
    if (firstSelection && secondSelection) {
      isWin ? onWinner() : onFailed()
    }

    if (firstSelection && secondSelection) {
      afterThePlay && afterThePlay(Object.assign(boardState.current))
      resetCurrentSelection()
    }
  }, [selectionState])

  return (
    <div className="grid gap-2 grid-cols-6 w-fit m-auto">
      {cardsOnBoard.map((cardState: CardState, index) => {
        const { card, isRevealed } = cardState
        const isSelected = false

        return (
          <CardImage
            key={index}
            showUp={isSelected || isRevealed}
            src={card.image.url}
            onClick={() => selectionHandler(cardState)}
          />
        )
      })}
    </div>
  )
}
