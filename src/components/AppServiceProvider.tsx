import { createContext, useContext } from 'react'
import { AppServices } from '../abstractions/AppServices'

const AppServiceContext = createContext<AppServices>({} as AppServices)

export const AppServiceProvider = ({
  children,
  appServices,
}: {
  children: any
  appServices: AppServices
}) => {
  return (
    <AppServiceContext.Provider value={appServices}>
      {children}
    </AppServiceContext.Provider>
  )
}

export const useAppServices = () => useContext(AppServiceContext)
