import axios from "axios";

export const allGames = () => {
  return axios
    .get("https://www.freetogame.com/api/games",)
    .then((response) => response.data)
    .catch((error) => {
      console.trace();
      console.log(error.message);
    });
};
