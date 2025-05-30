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
    <div className="w-full my-8">
      {/* Imagen principal con estado de carga */}
      <div className="w-full h-[50vh] relative mb-4 overflow-hidden bg-claro-tarjeta dark:bg-oscuro-tarjeta rounded-lg">
        <AnimatePresence mode="wait">
          <Img src={selectedImage} key={screenshots[currentIndex].id}/>
        </AnimatePresence>
        <button className="absolute opacity-0 z-10 size-full top-0 left-0" title="Presiona para hacerlo mas grande" onClick={() => toggleFullscreen()}></button>
      </div>

      {/* Thumbnails con estado de carga */}
      <div className="w-full overflow-x-auto scrollbar-custom h-full">
        <div className="flex gap-3 pb-2">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.id}
              className={` mt-3.5 relative cursor-pointer rounded-lg  bg-claro-tarjeta dark:bg-oscuro-tarjeta ${
                selectedImage === screenshot.image
                  ? "outline-2 outline-claro-icono dark:outline-oscuro-icono"
                  : ""
              }`}
              onClick={() => handleSelectImage(screenshot.image, index)}
              whileHover={{ scale: 1.05 }}
            >
              <Img src={screenshot.image} key={screenshot.image} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Mode */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 bg-claro-fondo/95 dark:bg-oscuro-fondo/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-[90vw] h-[90vh] flex flex-col items-center justify-center"
              layoutId="featured-image"
            >


              <motion.img
                src={selectedImage}
                alt="Featured screenshot fullscreen"
                className="max-w-full max-h-full object-contain"
              />

              <button
                className="absolute top-4 right-4 bg-claro-borde/70 dark:bg-oscuro-borde/70 rounded-full p-3 text-claro-texto dark:text-oscuro-texto hover:bg-claro-borde dark:hover:bg-oscuro-borde transition-colors"
                onClick={toggleFullscreen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-5">
                {screenshots.map((screenshot, index) => (
                  <motion.div
                    key={`fullscreen-${screenshot.id || index}`}
                    className={`w-7 h-4 rounded-full cursor-pointer
                               ${index === currentIndex
                    ? "bg-claro-icono dark:bg-oscuro-icono"
                    : "bg-claro-borde dark:bg-oscuro-borde"
                  }`}
                    onClick={() => handleSelectImage(screenshot.image, index)}
                    whileHover={{ scale: 1.2 }}
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
