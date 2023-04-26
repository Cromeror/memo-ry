import { RegisterForm } from '../components/RegisterForm'
import { useAppServices } from '../components/AppServiceProvider'
import { useNavigate } from 'react-router-dom'

export const UserRegister = () => {
  const { localStorageService } = useAppServices()
  const navigate = useNavigate()

  return (
    <div className="flex justify-center align-center h-screen">
      <RegisterForm
        className="m-auto"
        onSubmit={(x) => {
          localStorageService.savePlayer(x).then(() => {
            navigate('/stage')
          })
        }}
      />
    </div>
  )
}
