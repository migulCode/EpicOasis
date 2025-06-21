import axios from "axios"
import { API_KEY } from "astro:env/server"
import { htmlToTextCustom } from "../utils/formatHTMLToString.js"

const URL_GAMES = "https://api.rawg.io/api/games"

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
          thumbnail: game.background_image
        }
      })
    })
    .catch((error) => {
      console.log(error.message)
    })
}


export const bestGames = () => {
  return axios
    .get(`${URL_GAMES}?key=${API_KEY}&page_size=9&ordering=-rating&ordering=-added&tags=multiplayer`)
    .then((response) => response.data.results)
    .catch((error) => {
      console.log(error.message)
    })
}


export const gameDetails = (name) => {

  return axios
    .get(`${URL_GAMES}/${name}?key=${API_KEY}`)
    .then((response) => {
      return { ...response.data, description: htmlToTextCustom(response.data.description) }
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export const gameScreenshots = (name) => {
  return axios
    .get(`${URL_GAMES}/${name}/screenshots?key=${API_KEY}`)
    .then((response) => {
      return response.data.results
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export const searchGames = (name = "a") => {
  return axios
    .get(`${URL_GAMES}?key=${API_KEY}&search=${name}}`)
    .then((response) => response.data)
    .catch(error => {
      console.log(error)
    })
}