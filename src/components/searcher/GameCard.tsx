import { motion } from "framer-motion"
import type { Game } from "../../types/result.ts"


export default function GameCard({ game }: { game: Game }) {


  return (
    <motion.div
      layout // Permite animaciones suaves si la lista se reordena
      className="relative aspect-[3/4] w-full overflow-hidden rounded-xl shadow-lg group cursor-pointer"
      onClick={() => window.open(`../game/${game.slug}`, "_blank")}
    >
      {/* Imagen de fondo */}
      <img
        src={game.background_image}
        alt={`Fondo de ${game.name}`}
        className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
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
