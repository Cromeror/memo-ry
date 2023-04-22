import { LocalStorageService } from './LocalStorageService'
import { LocalStorageClient } from './LocalStorageClient'

export interface AppServices {
  localStorageClient: LocalStorageClient
  localStorageService: LocalStorageService
}
