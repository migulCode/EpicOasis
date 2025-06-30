import Img from "./GameCoverImage.jsx"
import type { Game } from "../types/APIResult.js"

function List({ games } : { games: Game[] }) {
  return (
    <section className="card-container prose-h2:prose-xl max-sm:prose-h2:prose-base">

      <h2 className="font-bold text-claro-texto dark:text-oscuro-texto mb-5 text-center">
        Explore Our Premier Collection
      </h2>

      <div className="card-box">

        {games &&
          games.map((game, index) => (

            <div
              key={game.id}
              style={{ animation: `var(--animate-loader) ${index * 0.1}s` }}
              title={game.name}
              className=" flex flex-col items-center border-1 p-3 min-w-[300px] max-w-[400px] bg-claro-tarjeta border-claro-borde dark:bg-oscuro-tarjeta dark:border-oscuro-borde rounded-lg shadow-md max-md:w-[90%] max-md:min-w-none max-md:max-w-[600px] opacity-0 prose-a:prose-xl"
            >
              <figure >
                <Img
                  src={game.background_image}
                />
              </figure>

              <a
                href={`/game/${game.slug}`}
                className="w-[90%] text-center truncate hover:underline">
                {game.name}
              </a>

            </div>

          ))}

      </div>
    </section>
  )
}

export default List
