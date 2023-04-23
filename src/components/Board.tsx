import { useAppServices } from './AppServiceProvider'
import { useEffect, useState } from 'react'
import { Card } from '../abstractions/domine/Card'
import { CardImage } from './CardImage'

export const Board = () => {
  const { memoryApiService } = useAppServices()
  const [data, setData] = useState<Card[]>([])

  useEffect(() => {
    memoryApiService.getAllCards().then((cards) => {
      setData(cards)
    })
  }, [])

  return (
    <div className="grid gap-2 grid-cols-6 w-fit m-auto">
      {data.slice(0, 18).map((card) => {
        return <CardImage src={card.image.url} />
      })}
    </div>
  )
}
