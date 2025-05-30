import { motion } from "framer-motion"
import { useState, useRef, useEffect, Fragment } from "react"

export default function Img({ src }: { src: string }) {
  const [loadImage, setLoadImage] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Verifica si la imagen ya está cargada después del render
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoadImage(true)
    }
  }, [src])

  return (
    <>
      {!loadImage && (
        <motion.div
          className="absolute top-0 left-0 z-10 size-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-lg flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.4, ease: "easeOut" }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Spinner animado */}
          <div className="relative">
            <motion.div
              className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            {/* Pulso interno */}
            <motion.div
              className="absolute inset-2 bg-white/20 rounded-full"
              animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Texto opcional */}
          <motion.div
            className="absolute bottom-4 text-white text-sm font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Loading...
          </motion.div>
        </motion.div>
      )}

      {/* Imagen con animación de entrada */}
      <motion.img
        ref={imgRef}
        src={src}
        alt="Game Image"
        className="w-full h-full object-cover rounded-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: loadImage ? 1 : 0,
          scale: loadImage ? 1 : 0.95
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onLoad={() => setLoadImage(true)}
      />
    </>
  )
}