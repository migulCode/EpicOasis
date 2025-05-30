
export interface Platform {
  id: number
  name: string
  slug: string
}

export interface PlatformWrapper {
  platform: Platform
}

export interface Genre {
  id: number
  name: string
  slug: string
}

export interface Developer {
  id: number
  name: string
  slug: string
}

export interface Publisher {
  id: number
  name: string
  slug: string
}

export interface Store {
  id: number
  name: string
  slug: string
}

export interface StoreWrapper {
  store: Store
}

export interface ESRBRating {
  id: number
  name: string
  slug: string
}

export interface Tag {
  id: number
  name: string
  slug: string
  language: string
}

/**
 * Representa una captura de pantalla de un videojuego
 *
 * @example
 * const screenshot: Screenshot = {
 *   id: 1,
 *   image: "https://example.com/screenshot.jpg",
 *   width: 1920,
 *   height: 1080
 * }
 */
export interface Screenshot {
  id: number
  image: string
  width: number
  height: number
}

// Tipo principal del juego
export interface Game {
  id: number
  name: string
  slug: string
  description: string
  released: string
  background_image: string
  rating: number
  rating_top: number
  ratings_count: number
  metacritic: number | null
  website: string | null

  // Arrays opcionales
  platforms?: PlatformWrapper[]
  genres?: Genre[]
  developers?: Developer[]
  publishers?: Publisher[]
  stores?: StoreWrapper[]
  tags?: Tag[]

  // Objetos opcionales
  esrb_rating?: ESRBRating | null
}
