// TODO revisar el diseño y el codigo generado por IA
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Screenshot } from "../../types/api.ts"
import Img from "./Img.jsx"

export default function Gallery({ screenshots } : { screenshots: Screenshot[] }) {

  // Estado para la imagen seleccionada y el modo de pantalla completa
  const [selectedImage, setSelectedImage] = useState<string >(screenshots?.[0]?.image)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  // Cambia automáticamente las imágenes cada 3 segundos
  useEffect(() => {
    if (!screenshots || screenshots.length <= 1) {
      return
    }

    if (isFullscreen) {
      return
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length)
    }, 3000)


    return () => clearInterval(interval)
  }, [screenshots, isFullscreen, selectedImage])

  // Actualiza la imagen seleccionada cuando cambia el índice actual
  useEffect(() => {
    if (screenshots && screenshots[currentIndex]) {
      setSelectedImage(screenshots[currentIndex].image)
    }
  }, [currentIndex, screenshots])

  // Si no hay screenshots, mostrar mensaje
  if (!screenshots || !screenshots.length) {
    return (
      <div className="w-full text-center py-10 text-claro-texto-secundario dark:text-oscuro-texto-secundario">
        No hay imágenes disponibles para este juego
      </div>
    )
  }

  // Función para seleccionar una imagen
  const handleSelectImage = (image : string, index : number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  // Función para alternar el modo de pantalla completa
  const toggleFullscreen = () => {
    setIsFullscreen( prev => !prev)
  }

  return (
    <div className="w-full ">
      {/* Imagen principal con estado de carga */}
      <div className="w-full h-[50vh] max-h-[500px] relative mb-4 overflow-hidden bg-claro-tarjeta dark:bg-oscuro-tarjeta rounded-lg">
        <AnimatePresence mode="wait">
          <Img src={selectedImage} key={screenshots[currentIndex].id}/>
        </AnimatePresence>
        <button className="absolute opacity-0 size-full top-0 left-0" title="Presiona para hacerlo mas grande" onClick={() => toggleFullscreen()}></button>
      </div>


      <div className="scrollbar-custom">
        <div className="flex gap-4 items-center justify-start overflow-x-auto p-4">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.id}
              className={`shrink-0 relative inset-0 transition-transform duration-300 hover:scale-110 cursor-pointer rounded-lg bg-claro-tarjeta w-[170px] aspect-7/4 dark:bg-oscuro-tarjeta ${
                selectedImage === screenshot.image
                  ? "outline-2 outline-claro-icono dark:outline-oscuro-icono outline-offset-2"
                  : ""
              }`}
              onClick={() => handleSelectImage(screenshot.image, index)}
            >
              <Img src={screenshot.image} key={screenshot.image} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Mode */}
      <AnimatePresence mode="wait">
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-10 bg-claro-fondo/95 dark:bg-oscuro-fondo/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >

            <motion.div
              className="relative top-0 left-0 z-20 w-[90vw] h-[90vh] size-full flex flex-col items-center justify-center"
            >

              <button
                className="absolute top-2 right-2 md:top-4 md:right-4 z-30 bg-[var(--color-claro-tarjeta)]/95 dark:bg-[var(--color-oscuro-tarjeta)]/90 hover:bg-[var(--color-claro-borde)]/60 dark:hover:bg-[var(--color-oscuro-icono)]/20 backdrop-blur-sm rounded-lg p-1.5 md:p-2 transition-colors duration-200 shadow-sm border border-[var(--color-claro-borde)] dark:border-[var(--color-oscuro-borde)]"
                title="Cerrar pantalla completa"
                onClick={() => toggleFullscreen()}
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-[var(--color-claro-texto)] dark:text-[var(--color-oscuro-icono)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                key={`fullscreen-${selectedImage}`}
                transition={{
                  duration: 0.3
                }}
                src={selectedImage}
                alt="Featured screenshot fullscreen"
                className="max-w-full max-h-full object-contain w-full h-full"
              />


              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-5">
                {screenshots.map((screenshot, index) => (
                  <motion.div
                    key={`fullscreen-${screenshot.id}`}
                    className={`w-7 h-4 rounded-full cursor-pointer hover:scale-125 transition-transform duration-300 outline-2 outline-claro-icono dark:outline-oscuro-icono outline-offset-2
                               ${index === currentIndex
                    ? "bg-claro-icono dark:bg-oscuro-icono"
                    : "bg-claro-borde dark:bg-oscuro-borde"
                  }`}
                    onClick={() => handleSelectImage(screenshot.image, index)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

        )}
      </AnimatePresence>
    </div>
  )
}
