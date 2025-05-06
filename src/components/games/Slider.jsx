import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Slider({ games }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);

  useEffect(() => {
    // Solo ejecuta si hay más de una plataforma
    if (platforms.length !== 1) {
      const intervalId = setInterval(() => {
        setCurrentPlatformIndex(
          (prevIndex) => (prevIndex + 1) % platforms.length
        );
      }, 1500);

      return () => {
        setCurrentPlatformIndex(0);

        return clearInterval(intervalId);
      };
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + games.length) % games.length
    );
  };

  if (!games || !games.length) {
    return <div className="slider-container">No hay juegos disponibles</div>;
  }

  const currentGame = games[currentIndex];
  const platforms = currentGame.plataformas || [];

  return (
    <div className="slider-container">
      <div className="carrousel-box">
        {/* Columna izquierda: Título + Descripción */}
        <AnimatePresence mode="sync">
          <motion.div
            className="left-carrousel-box"
            key={currentGame.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              className="title-carrousel-box"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.6 }}
            >
              {currentGame.name}
            </motion.h2>

            <motion.div>
              <div className="relative h-[2rem] overflow-hidden mb-3 not-prose text-bold text-xl max-sm:text-base ">
                <p className="">
                  Available in:
                  <AnimatePresence>
                    <motion.span
                      key={currentPlatformIndex}
                      initial={{ y: 20, opacity: 0 }} // Empieza abajo y transparente
                      animate={{ y: 0, opacity: 1 }} // Entra al centro y visible
                      exit={{ y: -20, opacity: 0 }} // Sale hacia arriba y transparente
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute w-full ml-3"
                    >
                      {platforms[currentPlatformIndex]?.platform?.name}
                    </motion.span>
                  </AnimatePresence>
                </p>
              </div>

              <motion.p
                className="description-carrousel-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                {currentGame.description}
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Columna derecha: Imagen */}
        <div className="right-carrousel-box">
          <div className="bg-carrousel-box"></div>
          <div className="bg-carrousel-box-bottom"></div>
          <img
            src={currentGame.background_image}
            alt={currentGame.name}
            className="img-carrousel-box"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="slider-controls">
        <button
          onClick={prevSlide}
          className="slider-control-prev slider-control-button"
        >
          <ChevronLeft className="button-icon"/>
        </button>
        <button
          onClick={nextSlide}
          className="slider-control-next slider-control-button"
        >
          <ChevronRight className="button-icon"/>
        </button>
      </div>
    </div>
  );
}

export default Slider;
