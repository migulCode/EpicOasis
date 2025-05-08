function List({ games }) {
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
              className="flex flex-col items-center p-3 min-w-[300px] max-w-[400px] bg-claro-tarjeta border-claro-borde dark:bg-oscuro-tarjeta dark:border-oscuro-borde rounded-lg shadow-md max-md:w-[90%] max-md:min-w-none max-md:max-w-[600px] opacity-0 prose-a:prose-xl"
            >
              <figure className="mt-auto mb-3 w-full aspect-94/53 min-h-50">
                <img
                  className="size-full object-cover object-top"
                  loading="lazy"
                  src={game.background_image}
                  alt={game.name}
                />
              </figure>
              <a
                href={`/game/${game.slug}`}
                className="w-[90%] text-center truncate hover:underline"
              >
                {game.name}
              </a>
            </div>
          ))}
      </div>
    </section>
  );
}

export default List;
