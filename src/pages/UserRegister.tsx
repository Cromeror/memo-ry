import { RegisterForm } from '../components/RegisterForm'

export const UserRegister = () => {
  return (
    <div className="container m-auto">
      <RegisterForm
        onSubmit={(x) => {
          console.log(x)
        }}
      />
    </div>
  )
}
