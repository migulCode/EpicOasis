// TODO revisar el diseño y el codigo generado por IA

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery({ screenshots }) {
  // Estado para la imagen seleccionada y el modo de pantalla completa
  const [selectedImage, setSelectedImage] = useState(
    screenshots?.[0]?.image || null
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);
  // Nuevo estado para manejar las imágenes cargadas
  const [loadedImages, setLoadedImages] = useState({});

  // Cambia automáticamente las imágenes cada 3 segundos
  useEffect(() => {
    if (!screenshots || screenshots.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [screenshots]);

  // Actualiza la imagen seleccionada cuando cambia el índice actual
  useEffect(() => {
    if (screenshots && screenshots[currentIndex]) {
      setSelectedImage(screenshots[currentIndex].image);
    }
  }, [currentIndex, screenshots]);

  // Función para marcar una imagen como cargada
  const handleImageLoaded = (imageUrl) => {
    setLoadedImages((prev) => ({
      ...prev,
      [imageUrl]: true,
    }));
  };

  // Si no hay screenshots, mostrar mensaje
  if (!screenshots || !screenshots.length) {
    return (
      <div className="w-full text-center py-10 text-claro-texto-secundario dark:text-oscuro-texto-secundario">
        No hay imágenes disponibles para este juego
      </div>
    );
  }

  // Función para seleccionar una imagen
  const handleSelectImage = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  // Función para alternar el modo de pantalla completa
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="gallery-container w-full my-8" ref={galleryRef}>
      {/* Imagen principal con estado de carga */}
      <div className="featured-image-container w-full h-[50vh] relative mb-4 overflow-hidden bg-claro-tarjeta dark:bg-oscuro-tarjeta rounded-lg">
        {/* Loader para la imagen principal */}
        {!loadedImages[selectedImage] && (
          <div className="absolute inset-0 bg-oscuro-tarjeta/90 dark:bg-oscuro-fondo/90 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-claro-borde dark:border-oscuro-borde border-t-claro-icono dark:border-t-oscuro-icono rounded-full animate-spin"></div>
          </div>
        )}

        <motion.img
          src={selectedImage}
          alt="Featured screenshot"
          className={`w-full h-full object-contain cursor-pointer transition-opacity duration-300 ${
            loadedImages[selectedImage] ? "opacity-100" : "opacity-0"
          }`}
          onClick={toggleFullscreen}
          layoutId="featured-image"
          transition={{ duration: 0.5 }}
          onLoad={() => handleImageLoaded(selectedImage)}
          style={{
            visibility: loadedImages[selectedImage] ? "visible" : "hidden",
          }}
        />

        <button
          className="absolute top-2 right-2 bg-claro-borde/70 dark:bg-oscuro-borde/70 rounded-full p-2 text-claro-texto dark:text-oscuro-texto hover:bg-claro-borde dark:hover:bg-oscuro-borde transition-colors z-10"
          onClick={toggleFullscreen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 8V4m0 0h4M3 4l4 4m10-4v4m0-4h-4m4 0l-4 4M3 12v4m0 0h4m-4 0l4-4m10 4v-4m0 4h-4m4 0l-4-4" />
          </svg>
        </button>
      </div>

      {/* Thumbnails con estado de carga */}
      <div className="thumbnails-container w-full overflow-x-auto">
        <div className="flex gap-3 pb-2">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.id || index}
              className={`thumbnail-container min-w-[150px] h-24 overflow-hidden rounded-md cursor-pointer transition-all border-2 relative
                         ${
                           index === currentIndex
                             ? "border-claro-icono dark:border-oscuro-icono"
                             : "border-transparent"
                         }
                        `}
              onClick={() => handleSelectImage(screenshot.image, index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Loader para las miniaturas */}
              {!loadedImages[screenshot.image] && (
                <div className="absolute inset-0 bg-oscuro-tarjeta/90 dark:bg-oscuro-fondo/90"></div>
              )}

              <img
                src={screenshot.image}
                alt={`Screenshot ${index + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  loadedImages[screenshot.image] ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoaded(screenshot.image)}
              />
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
              {/* Loader para imagen en pantalla completa */}
              {!loadedImages[selectedImage] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-claro-borde dark:border-oscuro-borde border-t-claro-icono dark:border-t-oscuro-icono rounded-full animate-spin"></div>
                </div>
              )}

              <motion.img
                src={selectedImage}
                alt="Featured screenshot fullscreen"
                className="max-w-full max-h-full object-contain"
                onLoad={() => handleImageLoaded(selectedImage)}
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

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {screenshots.map((screenshot, index) => (
                  <motion.div
                    key={`fullscreen-${screenshot.id || index}`}
                    className={`w-3 h-3 rounded-full cursor-pointer 
                               ${
                                 index === currentIndex
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
  );
}
