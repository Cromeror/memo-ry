import { AppServices } from './abstractions/AppServices'
import { LocalStorageClientImpl } from './clients/LocalStorageClientImpl'

export const setup = (): AppServices => {
  return {
    localStorageClient: new LocalStorageClientImpl(),
  }
}
