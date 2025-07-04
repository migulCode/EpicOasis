import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Img from "./GameCoverImage"
import type { GameDetail } from "../types/APIResult"

function Slider({ gamesDetail }: { gamesDetail: GameDetail[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0)

  const currentGame = gamesDetail[currentIndex]
  const platforms = currentGame.platforms || []

  useEffect(() => {
    // Solo ejecuta si hay más de una plataforma
    if (platforms.length !== 1) {
      const intervalId = setInterval(() => {
        setCurrentPlatformIndex(
          (prevIndex) => (prevIndex + 1) % platforms.length
        )

      }, 1500)

      return () => {
        setCurrentPlatformIndex(0)

        return clearInterval(intervalId)
      }
    }
  }, [currentIndex])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % gamesDetail.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + gamesDetail.length) % gamesDetail.length
    )
  }

  if (!gamesDetail || !gamesDetail.length) {
    return <div className="slider-container">No hay juegos disponibles</div>
  }


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
              <a
                href={`/game/${currentGame.slug}`}
                className="max-xl:mb-30 inline-block mt-6 px-6 py-3 rounded-lg bg-claro-tarjeta dark:bg-oscuro-tarjeta text-claro-texto dark:text-oscuro-texto font-semibold shadow-md hover:opacity-80 transition-opacity duration-300 focus:outline-none focus:ring-2  border-1 border-claro-borde dark:border-oscuro-borde"// Pequeño delay para que aparezca después de la descripción
                title={`View details for ${currentGame.name}`}
              >
                View Details
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Imagen */}
        <div className="right-carrousel-box">
          <div className="bg-carrousel-box"></div>
          <div className="bg-carrousel-box-bottom"></div>
          <Img
            src={currentGame.background_image}
            isDown={true}
            hasClass={true}
          />
        </div>
      </div>

      {/* Botones */}
      <div className="slider-controls">
        <button
          onClick={prevSlide}
          className="slider-control-prev slider-control-button cursor-pointer"
          title="Go to previous slide"
        >
          <ChevronLeft className="button-icon"/>
        </button>
        <button
          onClick={nextSlide}
          className="slider-control-next slider-control-button cursor-pointer"
          title="Go to next slide"
        >
          <ChevronRight className="button-icon"/>
        </button>
      </div>
    </div>
  )
}

export default Slider
