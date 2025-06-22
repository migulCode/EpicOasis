import { motion } from "motion/react"
import type { Game, GameSearchResult } from "../../types/result"

// --- Componente de la Tarjeta de Juego ---
function GameCard({ game }: { game: Game }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      layout // Permite animaciones suaves si la lista se reordena
      className="relative aspect-[3/4] w-full overflow-hidden rounded-xl shadow-lg group"
    >
      {/* Imagen de fondo */}
      <img
        src={game.background_image}
        alt={`Fondo de ${game.name}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Gradiente para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Contenido de la tarjeta */}
      <div className="relative flex flex-col justify-end h-full p-5 text-white">
        {/* Puntuación Metacritic */}
        {game.metacritic && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`absolute top-4 right-4 text-lg font-bold w-12 h-12 flex items-center justify-center rounded-full border-2 ${
              game.metacritic > 75 ? "border-green-400 text-green-300" :
                game.metacritic > 50 ? "border-yellow-400 text-yellow-300" :
                  "border-red-400 text-red-300"
            }`}
          >
            {game.metacritic}
          </motion.div>
        )}

        {/* Plataformas */}
        <div className="flex gap-2 mb-2">
          {game.parent_platforms?.slice(0, 4).map(({ platform }) => (
            <span key={platform.id} className="text-gray-300 text-xs">
              {platform.name}
            </span>
          ))}
        </div>

        {/* Título del juego */}
        <h3 className="text-2xl font-bold leading-tight">{game.name}</h3>

        {/* Fecha de lanzamiento */}
        <p className="text-sm text-gray-400 mt-1">
          {game.released ? `Lanzamiento: ${new Date(game.released).toLocaleDateString()}` : "Próximamente"}
        </p>
      </div>
    </motion.div>
  )
}


// --- Componente Principal de Resultados ---
export default function Results({ games }: { games: GameSearchResult }) {
  if (!games || !games.results || games.results.length === 0) {
    // Puedes mostrar un mensaje o un placeholder si no hay resultados
    return (
      <div className="text-center py-20 max-w-[1300px] mx-auto">
        <p className="text-xl text-gray-500">Busca un juego para empezar.</p>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Anima cada tarjeta con un pequeño retraso
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 max-w-[1300px] mx-auto overflow-scroll h-full"
    >
      {games.results.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </motion.div>
  )
}

