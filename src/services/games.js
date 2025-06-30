import axios from "axios"
import { API_KEY } from "astro:env/server"
import { htmlToTextCustom } from "../utils/formatHTMLToString.ts"

const URL_GAMES = "https://api.rawg.io/api/games"

export const TopRatedGames = () => {
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

export const searchGames = (name = "") => {
  return axios
    .get(`${URL_GAMES}?key=${API_KEY}&search=${name}}`)
    .then((response) => response.data)
    .catch(error => {
      console.log(error)
    })
}