import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, memo } from "react"

function Img({ src }: { src: string }) {
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">("loading")

  useEffect(() => {
    // Solo resetear si la src realmente cambió
    setImageStatus("loading")

    const img = new Image()

    // Verificar si ya está en caché
    img.onload = () => {
      // Verificar si el componente sigue montado y la src no cambió
      setImageStatus("loaded")
    }

    img.onerror = () => {
      setImageStatus("error")
    }

    img.src = src

    // Si ya está cargada (caché), se ejecuta síncronamente
    if (img.complete && img.naturalWidth > 0) {
      setImageStatus("loaded")
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Imagen principal */}
      <motion.img
        src={src}
        alt="Game Image"
        className="w-full h-full object-cover"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: imageStatus === "loaded" ? 1 : 0,
          scale: imageStatus === "loaded" ? 1 : 0.95
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        loading="lazy"
      />

      {/* Loader con AnimatePresence */}
      <AnimatePresence>
        {imageStatus === "loading" && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.15 }}
          >
            <div className="relative">
              <motion.div
                className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Estado de error */}
      <AnimatePresence>
        {imageStatus === "error" && (
          <motion.div
            className="absolute inset-0 z-10 bg-claro-tarjeta dark:bg-oscuro-tarjeta flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center text-claro-texto dark:text-oscuro-texto">
              <p className="text-sm">Image unavailable</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ✅ CLAVE: Memoizar para evitar re-renders innecesarios
export default memo(Img)