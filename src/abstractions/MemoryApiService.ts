import { Card } from './domine/Card'

export interface MemoryApiService {
  getCards: (perPage?: number) => Promise<Card[]>
}
