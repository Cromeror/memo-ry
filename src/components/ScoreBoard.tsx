interface ScoreBoardProps {
  points: number
  fails: number
}

export const ScoreBoard = ({ points, fails }: ScoreBoardProps) => {
  return (
    <section className="text-center my-4 text-slate-600">
      <h1 className="text-lg font-bold uppercase">Score</h1>
      <span>
        Aciertos {points > 0 ? points : 0} - Errores {fails > 0 ? fails : 0}
      </span>
    </section>
  )
}
