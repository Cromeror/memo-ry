import { LocalStorageService } from '../abstractions/LocalStorageService'
import { Player } from '../abstractions/domine/Player'
import { LocalStorageClient } from '../abstractions/LocalStorageClient'

export const PLAYER_LOCALSTORAGE_KEY = '__player'

export class LocalStorageServiceImpl implements LocalStorageService {
  _client: LocalStorageClient
  constructor(client: LocalStorageClient) {
    this._client = client
  }

  async savePlayer(player: Player): Promise<void> {
    await this._client.set<Player>(PLAYER_LOCALSTORAGE_KEY, player)
  }

  async loadPlayer(): Promise<Player | null> {
    const playerData = await this._client.get<Player>(PLAYER_LOCALSTORAGE_KEY)

    try {
      return playerData
    } catch (e) {
      return Promise.resolve(null)
    }
  }
}
