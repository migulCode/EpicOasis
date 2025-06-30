import type { number, string } from "astro:schema"

// Interfaz para plataforma individual
interface Platform {
  id: number
  name: string
  slug: string
}

// Interfaz para plataforma con metadatos
interface PlatformWrapper {
  platform: Platform
}

// Interfaz para tienda
interface Store {
  id: number
  name: string
  slug: string
}

// Interfaz para tienda con metadatos
interface StoreWrapper {
  store: Store
}

// Interfaz para calificación individual
interface Rating {
  id: number
  title: string
  count: number
  percent: number
}

// Interfaz para estado de agregado por estatus
interface AddedByStatus {
  yet?: number
  owned?: number
  beaten?: number
  toplay?: number
  dropped?: number
  playing?: number
}

// Interfaz para etiqueta/tag
interface Tag {
  id: number
  name: string
  slug: string
  language: string
  games_count: number
  image_background: string
}

// Interfaz para clasificación ESRB
interface ESRBRating {
  id: number
  name: string
  slug: string
  name_en: string
  name_ru: string
}

// Interfaz para screenshot corto
interface ShortScreenshot {
  id: number
  image: string
}

// Interfaz para género
interface Genre {
  id: number
  name: string
  slug: string
}

// Interfaz para plataforma con requisitos (nueva)
interface PlatformWithRequirements {
  platform: Platform
  released_at: string
  requirements?: {
    minimum?: string
    recommended?: string
  }
}

// Interfaz para puntuación de Metacritic por plataforma
interface MetacriticPlatform {
  metascore: number
  url: string
}


interface Developer {
  id: number
  name: string
  slug: string
  games_count: number
  image_background?: string
}

type Publisher = Developer

// Interfaz para un juego individual
export interface Game {
  slug: string
  name: string
  playtime: number
  platforms: PlatformWrapper[]
  stores: StoreWrapper[]
  released: string
  tba: boolean
  background_image: string
  rating: number
  rating_top: number
  ratings: Rating[]
  ratings_count: number
  reviews_text_count: number
  added: number
  added_by_status: AddedByStatus
  metacritic: number | null
  suggestions_count: number
  updated: string
  id: number
  score: string
  clip: any | null // eslint-disable-line @typescript-eslint/no-explicit-any
  tags: Tag[]
  esrb_rating: ESRBRating | null
  user_game: any | null // eslint-disable-line @typescript-eslint/no-explicit-any
  reviews_count: number
  community_rating?: number
  saturated_color: string
  dominant_color: string
  short_screenshots: ShortScreenshot[]
  parent_platforms: PlatformWrapper[]
  genres: Genre[]
}

// GameDetail extendido con campos únicos de Welcome
export interface GameDetail extends Game {
  name_original: string
  description: string
  description_raw?: string
  background_image_additional?: string
  website?: string
  metacritic_platforms?: MetacriticPlatform[]
  screenshots_count: number
  movies_count?: number
  creators_count?: number
  achievements_count?: number
  parent_achievements_count?: number
  reddit_url?: string
  reddit_name?: string
  reddit_description?: string
  reddit_logo?: string
  reddit_count?: number
  twitch_count?: number
  youtube_count?: number
  metacritic_url?: string
  parents_count?: number
  additions_count?: number
  game_series_count?: number
  alternative_names?: string[]
  platforms: PlatformWithRequirements[]
  developers: Developer[]
  publishers: Publisher[]
}

// Interfaz principal para la respuesta de la API
export interface GameSearchResult {
  count: number
  next: string | null
  previous: string | null
  results: Game[]
  user_platforms: boolean
}


export interface Screenshot {
  id: number
  image: string
  width: number
  height: number
  is_deleted: boolean
}
