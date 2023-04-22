import { LocalStorageClient } from '../abstractions/LocalStorageClient'
import { setItem, getItem } from 'localforage'

export class LocalStorageClientImpl implements LocalStorageClient {
  async get<T>(key: string): Promise<T | null> {
    return getItem<T>(key)
  }

  async set<T>(key: string, data: T): Promise<void> {
    await setItem<T>(key, data)
  }
}
