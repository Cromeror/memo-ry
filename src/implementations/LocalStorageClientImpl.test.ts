jest.mock('localforage')

import { LocalStorageClientImpl } from './LocalStorageClientImpl'
import { setItem, getItem } from 'localforage'

describe(LocalStorageClientImpl.name, () => {
  it('should call to save player in local storage', async () => {
    const expected = 'SAVE_DATA_IN_STORAGE'
    const localStorageKey = 'TEST_KEY_LOCAL_STORAGE'
    const localStorageClient = new LocalStorageClientImpl()
    //act
    await localStorageClient.set<string>(
      localStorageKey,
      'SAVE_DATA_IN_STORAGE'
    )
    //expect
    expect(setItem).toBeCalledWith(localStorageKey, expected)
  })
  it('should call to get player in local storage', async () => {
    const localStorageKey = 'TEST_KEY_LOCAL_STORAGE'
    const localStorageClient = new LocalStorageClientImpl()
    //act
    await localStorageClient.get<string>(localStorageKey)
    //expect
    expect(getItem).toBeCalledWith(localStorageKey)
  })
})
