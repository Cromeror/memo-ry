import { Player } from './domine/Player'

export interface LocalStorageClient {
  savePlayer: () => void
  loadPlayer: () => Player
}
