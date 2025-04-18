import axios from "axios";

export const allGames = () => {
  return axios
    .get("https://62a3c9745bd3609cee6fe532.mockapi.io/Hola/todo",)
    .then((response) => response.data)
    .catch((error) => {
      console.trace();
      console.log(error.message);
    });
};
