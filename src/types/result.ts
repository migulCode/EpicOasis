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

// Interfaz principal para la respuesta de la API
export interface GameSearchResult {
  count: number
  next: string | null
  previous: string | null
  results: Game[]
  user_platforms: boolean
}