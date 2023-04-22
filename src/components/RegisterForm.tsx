import { useCallback, useRef } from 'react'
import { Player } from '../abstractions/domine/Player'

export interface RegisterFormProps {
  onSubmit?: (x: Player) => void
  className?: string
}

/**
 * for this component only uses React's API without an external library
 */
export const RegisterForm = ({ onSubmit, className }: RegisterFormProps) => {
  const nameRef = useRef<HTMLInputElement>(null)

  const onSubmitEvent = useCallback(
    (e: any) => {
      e.preventDefault()
      if (!onSubmit || !nameRef || !nameRef.current) {
        return
      }

      const { value: name } = nameRef.current
      onSubmit({ name })
    },
    [onSubmit]
  )

  return (
    <form
      className={`flex flex-col w-1/3 mx-auto gap-2 ${className}`}
      onSubmit={onSubmitEvent}
    >
      <label
        htmlFor="userName"
        className="uppercase text-xs font-bold text-slate-500"
      >
        Type you name
      </label>
      <input
        id="userName"
        className="px-4 py-2 border rounded outline-slate-500"
        ref={nameRef}
        placeholder="You name"
      />
      <button
        type="submit"
        className="rounded bg-orange-500 text-white font-bold px-4 py-2 mt-2"
      >
        Start!!
      </button>
    </form>
  )
}
