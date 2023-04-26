export const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <a
        href="/"
        className="text-xl font-semibold uppercase text-slate-600 flex flex-col justify-center items-center gap-2 relative"
      >
        <span className="animate-ping absolute inline-flex h-24 w-24 rounded-full bg-orange-600 opacity-75" />
        Go to start
      </a>
    </div>
  )
}
