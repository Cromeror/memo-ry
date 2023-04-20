import { useCallback, useRef } from 'react'

export interface RegisterFormProps {
  onSubmit?: (x: { name: string }) => void
}

/**
 * for this component only uses React's API without an external library
 */
export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const nameRef = useRef<HTMLInputElement>(null)

  const onSubmitEvent = useCallback(() => {
    if (!onSubmit || !nameRef || !nameRef.current) {
      return
    }

    const { value: name } = nameRef.current
    onSubmit({ name })
  }, [onSubmit])

  return (
    <form
      className="flex flex-col w-1/3 mx-auto gap-2"
      onSubmit={onSubmitEvent}
    >
      <label htmlFor="userName">Type you name</label>
      <input id="userName" ref={nameRef} placeholder="You name" />
      <button
        type="submit"
        className="rounded bg-orange-500 text-white font-bold"
      >
        Start!!
      </button>
    </form>
  )
}
