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

  const currentGame = games[currentIndex];

  return (
    <div className="h-screen flex items-center justify-center bg-black overflow-hidden relative">
      {/* Fondo animado */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      />

      {/* Contenido */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGame.id}
          className="z-10 flex items-center w-full max-w-7xl px-10 gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Columna izquierda: Título + Descripción */}
          <div className="flex flex-col gap-6 text-white w-[30%]">
            <motion.h2
              className="text-3xl font-bold bg-white text-black px-4 py-2 rounded-md w-fit"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {currentGame.title}
            </motion.h2>

            <motion.p
              className="bg-white text-black px-4 py-4 rounded-md text-md leading-snug"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {currentGame.short_description}
            </motion.p>
          </div>

          {/* Columna derecha: Imagen */}
          <motion.div
            className="w-[70%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={currentGame.thumbnail}
              alt={currentGame.title}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
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
