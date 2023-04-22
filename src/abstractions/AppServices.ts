import { LocalStorageService } from './LocalStorageService'
import { LocalStorageClient } from './LocalStorageClient'
import { HttpClient } from './HttpClient'
import { MemoryApiService } from './MemoryApiService'

export interface AppServices {
  localStorageClient: LocalStorageClient
  localStorageService: LocalStorageService
  httpClient: HttpClient
  memoryApiService: MemoryApiService
}
