import { Card } from './domine/Card'

export interface MemoryApiService {
  getAllCards: () => Promise<Card[]>
}
