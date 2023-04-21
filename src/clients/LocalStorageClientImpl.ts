import { LocalStorageClient } from '../abstractions/LocalStorageClient'
import { Player } from '../abstractions/domine/Player'

export class LocalStorageClientImpl implements LocalStorageClient {
  loadPlayer(): Player {
    return {
      name: 'Need finish implementation',
    }
  }
  savePlayer(): void {}
}
