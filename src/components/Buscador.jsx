// TODO arreglar el problema de la barra de busqueda y reorganizar el diseño
import { useState, useEffect } from "react"

const Buscador = () => {
  const [nameGame, setNameGame] = useState("")

  useEffect(() => {

    if (nameGame) {
      fetch(`api/search.json?name=${nameGame}`)
        .then(res => res.json())
        .then(resGames => console.log(resGames) )
    }

  }, [nameGame])

  const handlerWrite = (event) => {
    const { value } = event.target
    console.log(value)
    setNameGame(value)
  }


  return (
    <div className="fixed size-full z-1 inset-0 bg-claro-fondo dark:bg-oscuro-fondo/90">
      <form
        autoComplete="off"
        className="flex flex-col justify-center h-25 border-b-1"
        onSubmit={e => e.preventDefault()}>
        <input
          className="flex-grow outline-none h-20 placeholder:pl-1 pl-4 text-2xl"
          type="text"
          name="search"
          onChange={handlerWrite}
          value={nameGame}
          placeholder="Escribe para comenzar a buscar"
        />
      </form>
      <div className="text-2xl flex flex-col gap-10 p-4">
        <p>The Legend of Zelda: Breath of the Wild</p>
        <p>Grand Theft Auto V</p>
        <p>Fortnite</p>
      </div>
    </div>
  )
}

export default Buscador
