import './App.css'
import { useEffect } from 'react'
import { useAppServices } from './components/AppServiceProvider'
import { useNavigate } from 'react-router-dom'

function App() {
  const { localStorageService } = useAppServices()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const player = await localStorageService.loadPlayer()
      if (!!player) {
        navigate('/stage')
      } else {
        navigate('/welcome')
      }
    })()
  }, [])

  return (
    <p className="text-3xl font-bold underline">This is the first commit</p>
  )
}

export default App
