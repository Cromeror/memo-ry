import { Card } from '../abstractions/domine/Card'
import { CardImage } from './CardImage'
import { useEffect, useMemo, useRef, useState } from 'react'

interface BoardProps {
  cards: Card[]
  afterThePlay: (boardState: BoardState) => void
}

export interface BoardState {
  lastMove: 'WON' | 'LOSE' | 'NONE'
}

const isTheSameCard = ([c1, c2]: Card[]) => c1.uuid === c2.uuid

export const Board = ({ cards, afterThePlay }: BoardProps) => {
  const DEFAULT_SELECTION_STATE = {
    firstMove: null,
    secondMove: null,
    isWin: false,
  }
  const boardState = useRef<BoardState>({ lastMove: 'NONE' })
  const [selectionState, setSelectionState] = useState<{
    firstMove: {
      card: Card
      index: number
    } | null
    secondMove: {
      card: Card
      index: number
    } | null
    isWin: boolean
  }>(DEFAULT_SELECTION_STATE)

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

  const selectionHandler = (card: Card, index: number) => {
    const { firstMove, secondMove } = selectionState

    if (firstMove && secondMove) {
      return
    }

    if (!firstMove && !secondMove) {
      setSelectionState({
        ...selectionState,
        firstMove: {
          card,
          index,
        },
      })
      return
    }

    setSelectionState({
      ...selectionState,
      secondMove: { card, index },
      isWin: isTheSameCard([firstMove?.card!, card]),
    })
  }

  useEffect(() => {
    const { firstMove, secondMove, isWin } = selectionState
    if (firstMove && secondMove) {
      isWin ? onWinner() : onFailed()
    }

    if (firstMove && secondMove) {
      afterThePlay && afterThePlay(Object.assign(boardState.current))
      resetCurrentSelection()
    }
  }, [selectionState])

  const renderCards = useMemo(() => {
    return cards.map((card: Card, index) => {
      const { firstMove, secondMove } = selectionState
      const isRevealed =
        (firstMove?.card.uuid === card.uuid && firstMove.index === index) ||
        (secondMove?.card.uuid === card.uuid && secondMove.index === index)

      return (
        <CardImage
          key={index}
          disable={isRevealed}
          src={card.image.url}
          onClick={() => selectionHandler(card, index)}
        />
      )
    })
  }, [cards, selectionState])

  return (
    <div className="grid gap-2 grid-cols-6 w-fit m-auto">{renderCards}</div>
  )
}
