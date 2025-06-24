import { motion } from "motion/react"
import type { GameSearchResult } from "../../types/result"
import GameCard from "./GameCard"


// --- Componente Principal de Resultados ---
export default function Results({ games }: { games: GameSearchResult }) {

  if (!games) {
    return (
      <div className="text-center py-20 max-w-[1300px] mx-auto">
        <p className="text-xl text-claro-texto-secundario dark:text-oscuro-texto-secundario">Search for a game to get started.</p>
      </div>
    )
  }

  if (!games.results || games.results.length === 0) {

    return (
      <div className="text-center py-20 mx-auto">
        <p className="text-xl text-claro-texto-secundario dark:text-oscuro-texto-secundario">No results found for this search.</p>
      </div>
    )
  }


  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[1400px] p-8 mx-auto min-h-[100%]"
    >
      {games.results.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </motion.div>
  )
}

