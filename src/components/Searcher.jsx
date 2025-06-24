// TODO arreglar el problema de la barra de busqueda y reorganizar el diseño
import { useState, useEffect, useMemo } from "react"
import Results from "./searcher/Results"
import { motion } from "motion/react"
import { SquareX } from "lucide-react"

const Searcher = () => {
  const [nameGame, setNameGame] = useState("")
  const [game, setGame] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    if (!nameGame) {
      setGame("")
      return
    }

    const timeout = setTimeout(() => {
      setIsLoading(true)
      fetch(`/api/search.json?name=${nameGame}`)
        .then(res => res.json())
        .then(resGames => setGame(resGames))
        .catch(error => {
          console.error("Error:", error)
          setGame("")
        })
        .finally(() => setIsLoading(false))
    }, 2000)

    return () => clearTimeout(timeout)
  }, [nameGame])

  const memoizedResults = useMemo(() => {
    return <Results games={game} />
  }, [game])

  const handlerWrite = (event) => {
    const { value } = event.target
    setNameGame(value)
  }

  const handlerCloseWindow = () =>{
    document.querySelector("#searcher").classList.add("hidden")
    document.body.style.overflow = "auto"
  }

  const rainbowColors = isLoading ? [
    "#ff0000", // Rojo
    "#ff8000", // Naranja
    "#ffff00", // Amarillo
    "#80ff00", // Verde lima
    "#00ff00", // Verde
    "#00ff80", // Verde agua
    "#00ffff", // Cian
    "#0080ff", // Azul cielo
    "#0000ff", // Azul
    "#8000ff", // Violeta
    "#ff00ff", // Magenta
    "#ff0080" // Rosa
  ] : "#E5D1CB"

  return (
    <div className="fixed size-full z-1 inset-0 bg-claro-fondo dark:bg-oscuro-fondo overflow-auto hidden scrollbar-custom" id="searcher">
      <form
        autoComplete="off"
        className="flex flex-row items-center  h-22"
        onSubmit={e => e.preventDefault()}>
        <input
          className="flex-grow outline-none placeholder:pl-1 pl-4 text-2xl h-full"
          type="text"
          name="search"
          onChange={handlerWrite}
          value={nameGame}
          placeholder="Start typing to search"
        />
        <button
          key={nameGame}
          className="p-5 cursor-pointer h-full"
          onClick={handlerCloseWindow}>
          <SquareX
            size={40}
            strokeWidth="2"
          />
        </button>
      </form>
      <motion.div
        key={nameGame}
        className="h-1"
        style={{ width: nameGame ? "0" : "100%" }}
        animate={{ width: "100%", backgroundColor: rainbowColors,
          transition: { duration: 2, backgroundColor: { repeat: isLoading ? Infinity : 0, duration: isLoading ? 3 : 1 } } }}> </motion.div>


      {memoizedResults}


    </div>
  )
}

export default Searcher
