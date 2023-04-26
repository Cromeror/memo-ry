import { AppServices } from './abstractions/AppServices'
import { LocalStorageClientImpl } from './implementations/LocalStorageClientImpl'
import { LocalStorageServiceImpl } from './implementations/LocalStorageServiceImpl'
import { HttpClientImpl } from './implementations/HttpClientImpl'
import { MemoryApiServiceImpl } from './implementations/MemoryApiServiceImpl'

export const setup = (): AppServices => {
  const BASE_URL = 'https://fed-team.modyo.cloud/api'

  const localStorageClient = new LocalStorageClientImpl()
  const localStorageService = new LocalStorageServiceImpl(localStorageClient)
  const httpClient = new HttpClientImpl(BASE_URL)
  const memoryApiService = new MemoryApiServiceImpl(httpClient)

  return {
    localStorageClient,
    localStorageService,
    httpClient,
    memoryApiService,
  }
}
