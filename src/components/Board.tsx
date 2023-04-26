import { Card } from '../abstractions/domine/Card'
import { CardImage } from './CardImage'
import { useEffect, useMemo, useRef, useState } from 'react'

interface BoardProps {
  cards: Card[]
  afterMove: (boardState: BoardState) => void
}

export interface BoardState {
  lastMove: 'WON' | 'LOSE' | 'NONE'
  status: 'IN_PROGRESS' | 'FINISHED'
}

interface CardWithState {
  card: Card
  won: boolean
}

const isTheSameCard = ([c1, c2]: Card[]) => c1.uuid === c2.uuid

export const Board = ({ cards, afterMove }: BoardProps) => {
  const DEFAULT_SELECTION_STATE = {
    firstMove: null,
    secondMove: null,
    isWin: false,
  }
  const boardState = useRef<BoardState>({
    lastMove: 'NONE',
    status: 'IN_PROGRESS',
  })
  const upsideDownLastMove = useRef(false)
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
  const [lockedBoard, setLockedBoard] = useState(false)
  const [cardsWithState, setCardsWithState] = useState<CardWithState[]>([])

  const resetCurrentSelection = () => {
    setSelectionState(DEFAULT_SELECTION_STATE)
  }

  const onFailed = () => {
    const { firstMove, secondMove } = selectionState
    cardsWithState[firstMove!.index].won = false
    cardsWithState[secondMove!.index].won = false

    boardState.current = {
      lastMove: 'LOSE',
      status: 'IN_PROGRESS',
    }
  }

  const onWinner = () => {
    const { firstMove, secondMove } = selectionState
    cardsWithState[firstMove!.index].won = true
    cardsWithState[secondMove!.index].won = true

    boardState.current = {
      lastMove: 'WON',
      status: 'IN_PROGRESS',
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

    setLockedBoard(true)
    const isWin = isTheSameCard([firstMove?.card!, card])

    setSelectionState({
      ...selectionState,
      secondMove: { card, index },
      isWin,
    })
  }

  const checkIfPlayerIsWinner = () => {
    const upsideCards = cardsWithState.filter((x) => !x.won)
    if (upsideCards.length === 0) {
      boardState.current.status = 'FINISHED'
    }
  }

  /**
   * Checking if the move is a win o lose
   */
  useEffect(() => {
    const { firstMove, secondMove, isWin } = selectionState

    if (!firstMove || !secondMove) {
      return
    }
    isWin ? onWinner() : onFailed()

    checkIfPlayerIsWinner()
  }, [selectionState])

  /**
   * Mapping cards incoming to cards with states
   */
  useEffect(() => {
    const cardWithStates: CardWithState[] = cards.map((card: Card) => ({
      card: card,
      won: false,
    }))
    setCardsWithState(cardWithStates)
  }, [cards])

  /**
   * Behavior to keep upside down or revealed
   */
  useEffect(() => {
    if (lockedBoard && boardState.current.lastMove === 'LOSE') {
      upsideDownLastMove.current = true
      return
    }
    upsideDownLastMove.current = false
  }, [lockedBoard])

  /**
   * Dispatch callback to afterThePlay event & reset current Selection
   */
  useEffect(() => {
    const { firstMove, secondMove } = selectionState
    if (!firstMove || !secondMove) {
      return
    }

    afterMove && afterMove(Object.assign(boardState.current))

    setTimeout(() => {
      resetCurrentSelection()
      setLockedBoard(false)
    }, 1000)
  }, [selectionState])

  const renderCards = useMemo(() => {
    return cardsWithState.map(({ card, won }: CardWithState, index) => {
      const { firstMove, secondMove } = selectionState
      const isRevealed =
        (firstMove?.card.uuid === card.uuid && firstMove.index === index) ||
        (secondMove?.card.uuid === card.uuid && secondMove.index === index)

      return (
        <CardImage
          key={index}
          upsideDown={upsideDownLastMove.current && !won}
          disable={isRevealed || won || lockedBoard}
          src={card.image.url}
          onClick={() => selectionHandler(card, index)}
        />
      )
    })
  }, [cardsWithState, selectionState])

  return (
    <ul className="grid gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 w-fit m-auto">
      {renderCards}
    </ul>
  )
}
