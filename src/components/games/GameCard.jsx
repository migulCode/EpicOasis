import { useState, useEffect } from "react";

function GameCard({ allGames }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const showGames = allGames.slice(0, 9)
    setGames(showGames);
  }, [allGames]);


  return (
    <section className="flex flex-wrap justify-center gap-10 max-w-[1350px] m-auto my-10">
      {games.map((play, index) => (
        <div
          key={play.id}
          style={{ animation: `var(--animate-loader) ${index * 0.1}s` }}
          className="flex flex-col items-center p-3 w-[30%] min-w-[350px] max-w-[400px] bg-gray-100 rounded-lg shadow-md
          max-md:w-[90%] max-md:min-w-none max-md:max-w-[600px] prose opacity-0"
        >
          <h3 className="w-[90%] text-center">{play.title}</h3>
          <p>
            {play.short_description.length > 100
              ? play.short_description.slice(0, 100) + "..."
              : play.short_description}
          </p>
          <figure className="mt-auto mb-3 w-full aspect-94/53">
            <img
              className="size-full object-cover"
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

export default GameCard;
