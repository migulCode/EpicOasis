import axios from "axios";
import { API_KEY } from "astro:env/server";

const URL_GAMES = "https://api.rawg.io/api/games";

export const allGames = () => {
  return axios
    .get(`${URL_GAMES}?key=${API_KEY}`)
    .then((response) => {
      return response.data.results.map((game) => {
        return {
          id: game.id,
          title: game.name,
          short_description:
            "Lorem20 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          thumbnail: game.background_image,
        };
      });
    })
    .catch((error) => {
      console.trace();
      console.log(error.message);
    });
};

// Por revision

export const bestGames = () => {
  return axios
    .get(`${URL_GAMES}?key=${API_KEY}&page_size=6&ordering=-rating`)
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



export const gameDetails = (id) => {
  return axios
    .get(`${URL_GAMES}/${id}?key=${API_KEY}`)
    .then((response) => {
      return {...response.data};
    })
    .catch((error) => {
      console.log(error.message);
    });
};
