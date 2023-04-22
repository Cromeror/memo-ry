import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppServiceProvider } from './components/AppServiceProvider'
import { setup } from './compositionRoot'
import { UserRegister } from './pages/UserRegister'
import { NotFound } from './pages/NotFound'

const defaultAppServices = setup()
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'welcome',
    element: <UserRegister />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppServiceProvider appServices={defaultAppServices}>
      <RouterProvider router={router} />
    </AppServiceProvider>
  </React.StrictMode>
)
