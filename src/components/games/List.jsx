import { useState, useEffect } from "react";

function List({ allGames }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const showGames = allGames.slice(0, 9);
    setGames(showGames);
  }, [allGames]);

  return (
    <section className="card-container">
      {games.map((play, index) => (
        <div
          key={play.id}
          style={{ animation: `var(--animate-loader) ${index * 0.1}s` }}
          className="flex flex-col items-center p-3 w-[30%] min-w-[350px] max-w-[400px] bg-claro-tarjeta border-claro-borde dark:bg-oscuro-tarjeta dark:border-oscuro-borde rounded-lg shadow-md
          max-md:w-[90%] max-md:min-w-none max-md:max-w-[600px] opacity-0"
        >
          <h2 className="w-[90%] text-center text-xl">{play.title}</h2>
          <figure className="mt-auto mb-3 w-full aspect-94/53 min-h-50">
            <img
              className="size-full object-cover object-top"
              loading="lazy"
              src={play.thumbnail}
              alt={play.title}
            />
          </figure>
        </div>
      ))}
    </section>
  );
}

export default List;
