import { Player } from './domine/Player'

export interface LocalStorageService {
  savePlayer: (player: Player) => Promise<void>
  loadPlayer: () => Promise<Player | null>
}
