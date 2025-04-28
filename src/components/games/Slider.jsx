import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function Slider({ games }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + games.length) % games.length
    );
  };

  if(!games || games.length === 0) {
    return <div className="slider-container">No hay juegos disponibles</div>;
  }

  const currentGame = games[currentIndex]

  return (
    <div className="slider-container">
      {/* Contenido */}
      <AnimatePresence>
        <motion.div
          key={currentGame.id}
          className="carrousel-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Columna izquierda: Título + Descripción */}
          <motion.div
            className="left-carrousel-box"
            exit={{ opacity: 0}}
          >
            <motion.h2
              className="title-carrousel-box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {currentGame.title}
            </motion.h2>

            <motion.p
              className="description-carrousel-box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {currentGame.short_description}
            </motion.p>
          </motion.div>

          {/* Columna derecha: Imagen */}
          <motion.div
            className="right-carrousel-box"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-carrousel-box"></div>
            <img
              src={currentGame.thumbnail}
              alt={currentGame.title}
              className="img-carrousel-box"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Botones */}
      <div className="absolute bottom-8 right-10 flex gap-4 z-20">
        <button
          onClick={prevSlide}
          className="bg-white px-4 py-2 rounded-md shadow hover:bg-gray-200"
        >
          ⬅️
        </button>
        <button
          onClick={nextSlide}
          className="bg-white px-4 py-2 rounded-md shadow hover:bg-gray-200"
        >
          ➡️
        </button>
      </div>
    </div>
  );
}

export default Slider;
