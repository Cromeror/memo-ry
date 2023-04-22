import { LocalStorageClientImpl } from './LocalStorageClientImpl'
import { Player } from '../abstractions/domine/Player'
import { LocalStorageClient } from '../abstractions/LocalStorageClient'
import {
  LocalStorageServiceImpl,
  PLAYER_LOCALSTORAGE_KEY,
} from './LocalStorageServiceImpl'

describe(LocalStorageClientImpl.name, () => {
  it("should get a player's data.", async () => {
    const clientDummy: LocalStorageClient = {
      set: jest.fn(),
      get: jest.fn(),
    }
    const localStorageClient = new LocalStorageServiceImpl(clientDummy)

    await localStorageClient.loadPlayer()

    expect(clientDummy.get).toBeCalledTimes(1)
  })

  it("should get a player's data.", async () => {
    let dataExpected: Player = { name: 'player name' }
    const clientDummy: LocalStorageClient = {
      set: jest.fn(),
      get: jest.fn(),
    }
    const localStorageClient = new LocalStorageServiceImpl(clientDummy)

    await localStorageClient.savePlayer(dataExpected)

    expect(clientDummy.set).toBeCalledTimes(1)
    expect(clientDummy.set).toBeCalledWith(
      PLAYER_LOCALSTORAGE_KEY,
      dataExpected
    )
  })
})
