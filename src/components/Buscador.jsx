import { useState } from "react";

const App = () => {
  const [nameGame, setNameGame] = useState("");

  const handlerWrite = (event) => {
    const { value } = event.target;
    console.log(value);
    setNameGame(value);
  };


  return (
    <form
      autoComplete="off"
      className="bg-gray-100 flex flex-col justify-center h-20 w-[90%] m-auto mt-6 max-w-5xl border-1 rounded-xl"
    >
      <div className="flex flex-row ">
        <input
          className="flex-grow outline-none h-20 placeholder:pl-1 pl-4"
          type="text"
          name="search"
          onChange={handlerWrite}
          value={nameGame}
          placeholder="Escribe para comenzar a buscar"
        />
        <div>
          <select name="type" className="outline-none h-20 z-0 mr-4">
            <option value="none">Genero</option>
            <option value="freWorld">Mundo abierto</option>
            <option value="action">Accion</option>
            <option value="all">Todos</option>
          </select>
          <select name="type" className="outline-none h-20 mr-4">
            <option value="none">Plataforma</option>
            <option value="freWorld">Mundo abierto</option>
            <option value="action">Accion</option>
            <option value="all">Todos</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default App;
