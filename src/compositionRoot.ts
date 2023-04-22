import { AppServices } from './abstractions/AppServices'
import { LocalStorageClientImpl } from './implementations/LocalStorageClientImpl'
import { LocalStorageServiceImpl } from './implementations/LocalStorageServiceImpl'

export const setup = (): AppServices => {
  const localStorageClient = new LocalStorageClientImpl()
  const localStorageService = new LocalStorageServiceImpl(localStorageClient)

  return {
    localStorageClient,
    localStorageService,
  }
}
