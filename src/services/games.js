import axios from "axios";
import { API_KEY } from "astro:env/server";

export const allGames = () => {
  return axios
    .get(`https://api.rawg.io/api/games?key=${API_KEY}`,)
    .then((response) => {
      return response.data.results.map((game) => {
        return {
          id: game.id,
          title: game.slug,
          short_description: "asdadsadafaweaw",
          thumbnail: game.background_image,
        };
      });
    })
    .catch((error) => {
      console.trace();
      console.log(error.message);
    });
};
