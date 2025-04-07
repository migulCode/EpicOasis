import { useState } from "react";

const App = () => {
  const [cont, setCont] = useState(0);

  const aumentCont = () => {
    setCont(cont + 1);
  };

  return (
    <div className="bg-gray-200 h-[100px] w-[200px]">
      <h1>{cont}</h1>
      <button onClick={aumentCont}>Pressiona</button>
    </div>
  );
};

export default App;
